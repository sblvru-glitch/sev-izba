"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import "./form_window.scss";

type FormWindowProps = {
  open: boolean;
  onClose: () => void;
};

export default function FormWindow({ open, onClose }: FormWindowProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div className="form-window" role="dialog" aria-modal="true" aria-labelledby="form-window-title">
      <button type="button" className="form-window__backdrop" aria-label="Закрыть" onClick={onClose} />
      <div className="form-window__panel">
        <button type="button" className="form-window__close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <h2 id="form-window-title" className="form-window__title">
          Оставить заявку
        </h2>
        <p className="form-window__text">Свяжитесь с нами удобным способом:</p>
        <ul className="form-window__links">
          <li>
            <a href="tel:88002503550">8 (800) 250-35-50</a>
          </li>
          <li>
            <a href="mailto:info@sev-izba.ru">info@sev-izba.ru</a>
          </li>
          <li>
            <CustomLink href="/contacts" onClick={onClose}>
              Страница контактов
            </CustomLink>
          </li>
        </ul>
      </div>
    </div>,
    document.body
  );
}
