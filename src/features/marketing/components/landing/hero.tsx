"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PaperNote } from "./paper-note";
import { TimelineScrubber } from "./timeline-scrubber";

interface HeroProps {
  splashDone?: boolean;
}

const HERO_LETTERS = "Video editor".split("");
const HERO_ECHO_LETTERS = "rrrrr".split("");
const HERO_ECHO_STYLES = [
  "ml-[0.02em] blur-[0.3px]",
  "ml-[0.06em] blur-[0.8px]",
  "ml-[0.12em] blur-[1.5px]",
  "ml-[0.20em] blur-[2.5px]",
  "ml-[0.30em] blur-[4px]",
] as const;

export function Hero({ splashDone = false }: HeroProps) {
  const editorRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!splashDone) return;
    if (!editorRef.current) return;
    const letters = editorRef.current.querySelectorAll(".editor-letter");
    const ctx = gsap.context(() => {
      const echoLetters = editorRef.current!.querySelectorAll(".echo-letter");

      gsap.fromTo(
        letters,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        echoLetters,
        { opacity: 0, x: -5 },
        {
          opacity: (i: number) => 0.4 - i * 0.07,
          x: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.8,
        },
      );
    });
    return () => ctx.revert();
  }, [splashDone]);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-between overflow-hidden px-4 text-center">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col pb-20 md:pb-12">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-[2.5rem] font-bold tracking-tighter sm:text-5xl md:text-[5.5rem]">
            <h1 className="whitespace-nowrap">
              The <span className="inline-block w-2 md:w-8" /> <PaperNote />
            </h1>
            <h1 ref={editorRef} className="mt-3 whitespace-nowrap md:mt-8">
              {HERO_LETTERS.map((char, index) =>
                char === " " ? (
                  <span key={index}>&nbsp;</span>
                ) : (
                  <span
                    key={index}
                    className="editor-letter inline-block opacity-0"
                  >
                    {char}
                  </span>
                ),
              )}
              {HERO_ECHO_LETTERS.map((char, index) => (
                <span
                  key={`echo-${index}`}
                  className={`echo-letter inline-block opacity-0 ${HERO_ECHO_STYLES[index]}`}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="-mt-24 md:mt-0 [perspective:1200px] [perspective-origin:50%_30%]">
          <div className="[transform:rotateX(8deg)] [transform-origin:50%_100%]">
            <TimelineScrubber splashDone={splashDone} />
          </div>
        </div>
      </div>
    </div>
  );
}
