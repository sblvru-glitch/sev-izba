"use client";

import { useState } from "react";
import { FeedbackFormModal } from "@/app/components/feedback-form/FeedbackFormModal";

export function ProjectEstimateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="projectDetailPage__main-content__content__right__button"
        onClick={() => setOpen(true)}
      >
        Получить смету
      </button>
      <FeedbackFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Получить смету"
      />
    </>
  );
}
