"use client";

import { useEffect } from "react";
import { pageAnimation } from "./transition";

/**
 * next-view-transitions already uses document.startViewTransition for
 * router.push/replace and for popstate (back/forward), but onTransitionReady
 * only runs for programmatic navigation. Hooking startViewTransition applies
 * the same custom pseudo-element animations for history navigation too.
 */
export function ViewTransitionPageAnimation() {
  useEffect(() => {
    if (typeof document === "undefined" || !("startViewTransition" in document)) {
      return;
    }

    const doc = document;
    const original = doc.startViewTransition.bind(doc) as typeof doc.startViewTransition;

    doc.startViewTransition = function startViewTransitionWithPageAnimation(
      updateCallback: ViewTransitionUpdateCallback,
    ) {
      const transition = original(updateCallback);
      transition.ready.then(() => {
        pageAnimation();
      });
      return transition;
    };

    return () => {
      doc.startViewTransition = original;
    };
  }, []);

  return null;
}
