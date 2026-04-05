"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "./feedback-form.scss";

type FeedbackFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackFormModal({ open, onClose }: FeedbackFormModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const successToastRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  const runClose = useCallback(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const toast = successToastRef.current;

    if (!backdrop) {
      onClose();
      return;
    }

    if (toast && !panel) {
      gsap.killTweensOf([backdrop, toast]);
      gsap.to(toast, {
        opacity: 0,
        y: 12,
        scale: 0.96,
        duration: 0.22,
        ease: "power2.in",
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: onClose,
      });
      return;
    }

    if (!panel) {
      gsap.killTweensOf(backdrop);
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: onClose,
      });
      return;
    }

    gsap.killTweensOf([backdrop, panel]);
    gsap.to(panel, {
      opacity: 0,
      y: 20,
      scale: 0.94,
      duration: 0.28,
      ease: "power2.in",
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    gsap.killTweensOf([backdrop, panel]);
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(panel, { opacity: 0, y: 28, scale: 0.96 });

    gsap.to(backdrop, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(panel, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    });
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    setSubmitError(null);
    setSubmitting(false);
    setShowSuccessToast(false);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !mounted || !showSuccessToast) return;
    const el = successToastRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 16, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [open, mounted, showSuccessToast]);

  useEffect(() => {
    if (!showSuccessToast) return;
    const t = window.setTimeout(() => {
      runClose();
    }, 2200);
    return () => window.clearTimeout(t);
  }, [showSuccessToast, runClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") runClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, runClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "";

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, pageUrl }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string" ? data.error : "Не удалось отправить заявку",
        );
        return;
      }
      setShowSuccessToast(true);
    } catch {
      setSubmitError("Нет соединения с сервером. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || typeof document === "undefined" || !open) return null;

  return createPortal(
    <div ref={rootRef} className="feedback-form-modal" role="dialog" aria-modal="true" aria-labelledby={showSuccessToast ? "feedback-success-title" : "feedback-form-title"}>
      <button
        ref={backdropRef}
        type="button"
        className="feedback-form-modal__backdrop"
        aria-label="Закрыть"
        onClick={runClose}
      />
      {showSuccessToast ? (
        <div
          ref={successToastRef}
          className="feedback-form-modal__success-toast"
          role="status"
          id="feedback-success-title"
        >
          Сообщение отправлено!
        </div>
      ) : (
        <div ref={panelRef} className="feedback-form-modal__panel">
          <button type="button" className="feedback-form-modal__close" onClick={runClose} aria-label="Закрыть">
            ×
          </button>
          <h2 id="feedback-form-title" className="feedback-form-modal__title">
            Написать нам
          </h2>
          <form className="feedback-form-modal__form" onSubmit={handleSubmit}>
            {submitError ? (
              <p className="feedback-form-modal__error" role="alert">
                {submitError}
              </p>
            ) : null}
            <div className="feedback-form-modal__field">
              <label htmlFor="feedback-name">Имя</label>
              <input id="feedback-name" name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required />
            </div>
            <div className="feedback-form-modal__field">
              <label htmlFor="feedback-phone">Телефон</label>
              <input id="feedback-phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 …" required />
            </div>
            <div className="feedback-form-modal__field">
              <label htmlFor="feedback-email">E-mail</label>
              <input id="feedback-email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
            </div>
            <button
              type="submit"
              className="feedback-form-modal__submit"
              disabled={submitting}
            >
              {submitting ? "Отправка…" : "Отправить"}
            </button>
          </form>
        </div>
      )}
    </div>,
    document.body,
  );
}
