import { useEffect } from "react";

function useScrollTopOnce() {
  useEffect(() => window.scrollTo(0, 0), []);
}

export { useScrollTopOnce };
