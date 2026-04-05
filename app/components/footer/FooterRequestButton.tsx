"use client";

import { useState } from "react";
import { FeedbackFormModal } from "@/app/components/feedback-form/FeedbackFormModal";

export function FooterRequestButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="request-call"
        onClick={() => setOpen(true)}
      >
        Оставить заявку
      </button>
      <FeedbackFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Оставить заявку"
      />
    </>
  );
}
