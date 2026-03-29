"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@klipeo/shared";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // Logo starts small, spins fast, scales up
      tl.fromTo(
        logoRef.current,
        { scale: 0.15, rotation: 0, opacity: 0 },
        {
          scale: 1,
          rotation: 720,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );

      // Text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        "-=0.1",
      );

      // Brief hold
      tl.to({}, { duration: 0.5 });

      // Everything fades out + scales up
      tl.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.25,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div ref={logoRef} className="opacity-0">
        <Image
          src={siteConfig.assets.logo}
          alt={siteConfig.name}
          width={120}
          height={120}
          priority
        />
      </div>

      <span
        ref={textRef}
        className="mt-5 text-4xl font-bold tracking-tight text-white opacity-0"
      >
        {siteConfig.name}
      </span>
    </div>
  );
}
