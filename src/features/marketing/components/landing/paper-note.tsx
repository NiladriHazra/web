"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGsapContext } from "@/shared/hooks/use-gsap-context";
import { BoardNeko } from "./board-neko";
import { Thumbtack } from "./thumbtack";

export function PaperNote() {
  const boardRef = useRef<HTMLSpanElement>(null);
  const [swinging, setSwinging] = useState(true);

  useGsapContext(boardRef, () => {
    setSwinging(true);

    const tl = gsap.timeline({
      onComplete: () => setSwinging(false),
    });

    tl.fromTo(
      boardRef.current,
      { rotateX: 0 },
      { rotateX: -40, duration: 0.25, ease: "power2.out" },
    )
      .to(boardRef.current, {
        rotateX: 30,
        duration: 0.45,
        ease: "power1.inOut",
      })
      .to(boardRef.current, {
        rotateX: -20,
        duration: 0.55,
        ease: "power1.inOut",
      })
      .to(boardRef.current, {
        rotateX: 12,
        duration: 0.65,
        ease: "power1.inOut",
      })
      .to(boardRef.current, {
        rotateX: -6,
        duration: 0.75,
        ease: "power1.inOut",
      })
      .to(boardRef.current, {
        rotateX: 2,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(boardRef.current, {
        rotateX: 0,
        duration: 0.85,
        ease: "power2.out",
      });
  }, []);

  return (
    <span className="relative inline-flex items-center [perspective:800px]">
      <span className="invisible" aria-hidden="true">
        {"xxxxxxxxxx"}
      </span>
      <span
        ref={boardRef}
        className="absolute inset-x-[-16px] inset-y-[5%] flex items-center justify-center rounded-md border border-white/10 bg-[linear-gradient(165deg,#1c1c1e_0%,#141416_100%)] -rotate-2 [box-shadow:0_4px_20px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.3)] [transform-origin:50%_-10px]"
      >
        <Thumbtack id="tack1" className="absolute -top-2.5 left-4 z-10" />
        <Thumbtack id="tack2" className="absolute -top-2.5 right-4 z-10" />
        <BoardNeko swinging={swinging} />
        <span className="relative whitespace-nowrap px-4 text-[0.4em] font-bold tracking-[0.02em] text-amber-500 rotate-1 [font-family:var(--font-caveat),cursive] [text-shadow:0_0_20px_rgba(245,158,11,0.3)] sm:text-[0.42em]">
          coming soon
        </span>
      </span>
    </span>
  );
}
