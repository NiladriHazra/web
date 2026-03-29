"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface AdminPageTransitionProps {
  children: React.ReactNode;
}

export function AdminPageTransition({ children }: AdminPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );

      gsap.fromTo(
        el.querySelectorAll("[data-animate]"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.1,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
