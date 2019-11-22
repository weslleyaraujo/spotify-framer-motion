import { useRef, useEffect, useCallback } from "react";

function useClickOutSide<T extends HTMLElement>(
  ref: React.RefObject<T>,
  effect: () => void
) {
  const isTouch = useRef<boolean>(false);
  const callback = useCallback(
    (event: DocumentEventMap["touchend"] | DocumentEventMap["click"]) => {
      isTouch.current = event.type === "touch";
      if (event.type === "click" && isTouch.current) {
        return;
      }
      const el = ref.current;
      if (el && event.target && el.contains(event.target as HTMLElement)) {
        effect();
      }
      effect();
    },
    [effect, ref]
  );
  useEffect(() => {
    document.addEventListener("touchend", callback, true);
    document.addEventListener("click", callback, true);
    return () => {
      document.removeEventListener("touchend", callback, true);
      document.removeEventListener("click", callback, true);
    };
  });

  return ref;
}

export { useClickOutSide };
