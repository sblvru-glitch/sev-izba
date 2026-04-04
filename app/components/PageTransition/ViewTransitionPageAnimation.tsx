"use client";

import { useEffect } from "react";
import { pageAnimation } from "./transition";

/** Минимальная заглушка, если браузер не дал начать второй переход подряд */
function fallbackTransition(updateCallback: ViewTransitionUpdateCallback): ViewTransition {
  const result = updateCallback();
  const done =
    result != null && typeof (result as Promise<unknown>).then === "function"
      ? (result as Promise<unknown>)
      : Promise.resolve(result);
  return {
    finished: done,
    ready: Promise.resolve(),
    updateCallbackDone: done,
    skipTransition: () => {},
  } as ViewTransition;
}

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
      let transition: ViewTransition;
      try {
        transition = original(updateCallback);
      } catch {
        // InvalidStateError: уже идёт переход (быстрые клики по ссылкам)
        return fallbackTransition(updateCallback);
      }

      transition.ready
        .then(() => {
          try {
            pageAnimation();
          } catch {
            /* синхронные ошибки animate() */
          }
        })
        .catch(() => {
          /* переход прерван — не считаем ошибкой */
        });
      return transition;
    };

    return () => {
      doc.startViewTransition = original;
    };
  }, []);

  return null;
}
