"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NEKO_SPRITES } from "./neko-sprites";

type NekoState = "cling" | "sit" | "scratch" | "sleep" | "walkLeft" | "walkRight";

const SPRITE_MAP: Record<NekoState, [string, string]> = {
  cling: [NEKO_SPRITES.leftclaw1, NEKO_SPRITES.leftclaw2],
  sit: [NEKO_SPRITES.Awake, NEKO_SPRITES.Awake],
  scratch: [NEKO_SPRITES.scratch1, NEKO_SPRITES.scratch2],
  sleep: [NEKO_SPRITES.sleep1, NEKO_SPRITES.sleep2],
  walkLeft: [NEKO_SPRITES.left1, NEKO_SPRITES.left2],
  walkRight: [NEKO_SPRITES.Right1, NEKO_SPRITES.right2],
};

interface BoardNekoProps {
  swinging: boolean;
}

export function BoardNeko({ swinging }: BoardNekoProps) {
  const [state, setState] = useState<NekoState>("cling");
  const [frame, setFrame] = useState<0 | 1>(0);
  const nekoRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = undefined;
    }

    if (swinging) {
      setState("cling");
      if (nekoRef.current) {
        gsap.to(nekoRef.current, { x: 0, duration: 0.3 });
      }
      return;
    }

    setState("sit");

    const t1 = setTimeout(() => {
      setState("scratch");

      const t2 = setTimeout(() => {
        const walkTl = gsap.timeline();
        setState("walkRight");
        walkTl.to(nekoRef.current, { x: 35, duration: 1.5, ease: "none" });
        walkTl.call(() => setState("walkLeft"));
        walkTl.to(nekoRef.current, { x: -35, duration: 3, ease: "none" });
        walkTl.call(() => setState("walkRight"));
        walkTl.to(nekoRef.current, { x: 0, duration: 1.5, ease: "none" });
        walkTl.call(() => {
          setState("sit");
          const t3 = setTimeout(() => setState("sleep"), 2000);
          cleanupRef.current = () => clearTimeout(t3);
        });

        cleanupRef.current = () => walkTl.kill();
      }, 1500);

      cleanupRef.current = () => clearTimeout(t2);
    }, 2000);

    cleanupRef.current = () => clearTimeout(t1);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }
    };
  }, [swinging]);

  const sprite = SPRITE_MAP[state][frame];

  return (
    <div
      ref={nekoRef}
      className="absolute -top-10 left-1/2 z-20 -ml-6 h-12 w-12 sm:-top-12 sm:-ml-7 sm:h-14 sm:w-14 [image-rendering:pixelated]"
    >
      <Image
        src={sprite}
        alt=""
        fill
        unoptimized
        sizes="56px"
        className="h-full w-full [image-rendering:pixelated]"
      />
    </div>
  );
}
