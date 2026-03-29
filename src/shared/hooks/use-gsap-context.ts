import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

export function useGsapContext<T extends Element>(
  ref: RefObject<T | null>,
  callback: () => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(callback, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
