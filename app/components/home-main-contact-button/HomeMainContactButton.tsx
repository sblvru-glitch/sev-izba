"use client";

import { useState } from "react";
import { FeedbackFormModal } from "@/app/components/feedback-form/FeedbackFormModal";

export function HomeMainContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="home-main__cta" onClick={() => setOpen(true)}>
        Обсудить проект
      </button>
      <FeedbackFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
