"use client";

import { useState } from "react";
import { FeedbackFormModal } from "@/app/components/feedback-form/FeedbackFormModal";

export function ServicesFeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="form-btn"
        onClick={() => setOpen(true)}
      >
        Задать вопрос?
      </button>
      <FeedbackFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Задать вопрос?"
      />
    </>
  );
}
