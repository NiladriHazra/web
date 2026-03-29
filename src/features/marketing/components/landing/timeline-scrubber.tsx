"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MousePointer2, Music } from "lucide-react";
import { TopHighlight } from "./top-highlight";
import { WaveformBars } from "./waveform-bars";

interface Clip {
  readonly id: string;
  readonly label: string;
  readonly clipClassName: string;
  readonly ghostClassName: string;
}

interface TimelineScrubberProps {
  splashDone?: boolean;
}

const GHOST_BASE_CLASSNAME =
  "pointer-events-none absolute z-40 flex h-[46px] w-20 items-end overflow-hidden rounded-[10px] border border-white/15 opacity-0 backdrop-blur-lg [-webkit-backdrop-filter:blur(8px)] [box-shadow:0_8px_32px_rgba(0,0,0,0.3),inset_-2px_2px_12px_-2px_rgba(255,255,255,0.1),inset_4px_4px_3px_-4px_rgba(255,255,255,0.2),inset_-4px_-4px_3px_-4px_rgba(255,255,255,0.1),inset_0_1px_8px_-3px_rgba(255,255,255,0.15)]";

const MUSIC_GHOST_CLASSNAME =
  "pointer-events-none absolute z-40 flex h-9 w-[130px] items-center gap-2 overflow-hidden rounded-[10px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] px-3 opacity-0 backdrop-blur-lg [-webkit-backdrop-filter:blur(8px)] [box-shadow:0_8px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1),inset_-3px_-3px_3px_-3px_rgba(255,255,255,0.08)]";

const MUSIC_ROW_CLASSNAME =
  "mt-[3px] overflow-hidden rounded-[10px] border border-[hsla(222,30%,35%,0.15)] bg-[linear-gradient(180deg,hsla(222,25%,14%,0.95)_0%,hsla(222,22%,10%,0.97)_100%)] opacity-0 [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(222,30%,40%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(222,30%,35%,0.3),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.15),inset_0_1px_12px_-5px_hsla(222,30%,45%,0.35),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(222,30%,35%,0.25),0_4px_20px_rgba(0,0,0,0.25)]";

const PLAYHEAD_LINE_CLASSNAME =
  "absolute left-1/2 top-[14px] bottom-0 w-[2px] -translate-x-1/2 rounded-sm bg-[linear-gradient(to_bottom,#2979FF,rgba(41,121,255,0.6))] [box-shadow:0_0_8px_rgba(41,121,255,0.5),0_0_16px_rgba(41,121,255,0.15)]";

const CLIPS = [
  {
    id: "intro",
    label: "Intro",
    clipClassName:
      "w-[13%] border border-[hsla(222,40%,38%,0.15)] bg-[linear-gradient(180deg,hsla(222,40%,24%,0.97)_0%,hsla(222,40%,16%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(222,40%,48%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(222,40%,43%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(222,40%,53%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(222,40%,43%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(222,40%,26%,0.85)_0%,hsla(222,40%,14%,0.9)_100%)]",
  },
  {
    id: "main",
    label: "Main footage",
    clipClassName:
      "w-[27%] border border-[hsla(226,38%,36%,0.15)] bg-[linear-gradient(180deg,hsla(226,38%,22%,0.97)_0%,hsla(226,38%,14%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(226,38%,46%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(226,38%,41%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(226,38%,51%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(226,38%,41%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(226,38%,24%,0.85)_0%,hsla(226,38%,12%,0.9)_100%)]",
  },
  {
    id: "broll",
    label: "B-Roll",
    clipClassName:
      "w-[9%] border border-[hsla(42,55%,48%,0.15)] bg-[linear-gradient(180deg,hsla(42,55%,34%,0.97)_0%,hsla(42,55%,26%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(42,55%,58%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(42,55%,53%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(42,55%,63%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(42,55%,53%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(42,55%,36%,0.85)_0%,hsla(42,55%,24%,0.9)_100%)]",
  },
  {
    id: "interview",
    label: "Interview",
    clipClassName:
      "w-[21%] border border-[hsla(220,35%,37%,0.15)] bg-[linear-gradient(180deg,hsla(220,35%,23%,0.97)_0%,hsla(220,35%,15%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(220,35%,47%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(220,35%,42%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(220,35%,52%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(220,35%,42%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(220,35%,25%,0.85)_0%,hsla(220,35%,13%,0.9)_100%)]",
  },
  {
    id: "cta",
    label: "CTA",
    clipClassName:
      "w-[15%] border border-[hsla(228,42%,39%,0.15)] bg-[linear-gradient(180deg,hsla(228,42%,25%,0.97)_0%,hsla(228,42%,17%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(228,42%,49%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(228,42%,44%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(228,42%,54%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(228,42%,44%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(228,42%,27%,0.85)_0%,hsla(228,42%,15%,0.9)_100%)]",
  },
  {
    id: "outro",
    label: "Outro",
    clipClassName:
      "w-[15%] border border-[hsla(224,32%,35%,0.15)] bg-[linear-gradient(180deg,hsla(224,32%,21%,0.97)_0%,hsla(224,32%,13%,0.98)_100%)] [box-shadow:inset_-2px_2.4px_18px_-2.6px_hsla(224,32%,45%,0.1),inset_-5.7px_-4px_3.4px_-2.7px_hsla(224,32%,40%,0.35),inset_6.7px_6.7px_3.4px_-6.2px_rgba(255,255,255,0.2),inset_0_1px_12px_-5px_hsla(224,32%,50%,0.4),inset_-6.7px_-6.7px_3.4px_-6.7px_hsla(224,32%,40%,0.3),0_4px_20px_rgba(0,0,0,0.3)]",
    ghostClassName:
      "bg-[linear-gradient(180deg,hsla(224,32%,23%,0.85)_0%,hsla(224,32%,11%,0.9)_100%)]",
  },
] as const satisfies readonly Clip[];

const GHOST_VARIANT_CLASSNAMES = CLIPS.flatMap(({ ghostClassName }) =>
  ghostClassName.split(" "),
);

function applyGhostVariant(
  element: HTMLDivElement,
  ghostClassName: string,
) {
  element.classList.remove(...GHOST_VARIANT_CLASSNAMES);
  element.classList.add(...ghostClassName.split(" "));
}

export function TimelineScrubber({ splashDone }: TimelineScrubberProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const ghostLabelRef = useRef<HTMLSpanElement>(null);
  const musicGhostRef = useRef<HTMLDivElement>(null);
  const musicRowRef = useRef<HTMLDivElement>(null);
  const wavePlayedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !splashDone) return;

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        delay: 0.5,
      });

      master.set(cursorRef.current, { x: -100, y: -50, opacity: 0 });
      master.set(ghostRef.current, { opacity: 0, scale: 0.9 });
      master.set(musicGhostRef.current, { opacity: 0, scale: 0.8 });
      master.set(musicRowRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: "top",
      });
      CLIPS.forEach((clip) => master.set(`#clip-${clip.id}`, { opacity: 0 }));
      master.set(playheadRef.current, { opacity: 0 });
      master.to(cursorRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      master.to(cursorRef.current, {
        x: 10,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      CLIPS.forEach((clip, i) => {
        const speed = 1 - i * 0.12;
        const clipId = `#clip-${clip.id}`;

        master.call(() => {
          if (ghostRef.current) applyGhostVariant(ghostRef.current, clip.ghostClassName);
          if (ghostLabelRef.current) ghostLabelRef.current.textContent = clip.label;
        });

        master.to(ghostRef.current, {
          opacity: 0.8,
          scale: 1,
          duration: 0.15 * speed,
          ease: "power2.out",
        });

        const moveLabel = `move-${i}`;
        master.addLabel(moveLabel);

        master.call(
          () => {
            const clipEl = document.getElementById(`clip-${clip.id}`);
            if (!clipEl || !root) return;
            const rootRect = root.getBoundingClientRect();
            const clipRect = clipEl.getBoundingClientRect();
            const targetX =
              clipRect.left - rootRect.left + clipRect.width / 2 - 10;
            const targetY = 65;

            gsap.to(cursorRef.current, {
              x: targetX,
              y: targetY,
              duration: 0.4 * speed,
              ease: "power2.inOut",
            });
            gsap.to(ghostRef.current, {
              x: targetX + 8,
              y: targetY + 16,
              duration: 0.4 * speed,
              ease: "power2.inOut",
              delay: 0.04,
            });
          },
          [],
          moveLabel,
        );

        master.to({}, { duration: 0.42 * speed });

        const dropLabel = `drop-${i}`;
        master.addLabel(dropLabel);

        master.to(
          ghostRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: "+=10",
            duration: 0.15 * speed,
            ease: "power2.in",
          },
          dropLabel,
        );

        master.fromTo(
          clipId,
          { opacity: 0, y: -18, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35 * speed,
            ease: "back.out(2.5)",
          },
          dropLabel,
        );

        master.to(clipId, {
          y: -2,
          duration: 0.08 * speed,
          ease: "power1.out",
        });
        master.to(clipId, {
          y: 0,
          duration: 0.12 * speed,
          ease: "power2.inOut",
        });

        if (i < CLIPS.length - 1) {
          master.to(cursorRef.current, {
            y: -8,
            duration: 0.12 * speed,
            ease: "power1.out",
          });
        }
      });

      master.to(cursorRef.current, {
        x: -30,
        y: -20,
        duration: 0.35,
        ease: "power2.inOut",
      });

      master.to(musicGhostRef.current, {
        opacity: 0.85,
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.5)",
      });

      master.call(() => {
        if (!musicRowRef.current || !root) return;
        const rootRect = root.getBoundingClientRect();
        const musicRect = musicRowRef.current.getBoundingClientRect();
        const targetX = musicRect.width / 2 - 40;
        const targetY = musicRect.top - rootRect.top + 10;

        gsap.to(cursorRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(musicGhostRef.current, {
          x: targetX + 10,
          y: targetY + 14,
          duration: 0.5,
          ease: "power2.inOut",
          delay: 0.05,
        });
      });

      master.to({}, { duration: 0.55 });

      master.to(musicGhostRef.current, {
        opacity: 0,
        scale: 0.9,
        y: "+=6",
        duration: 0.15,
        ease: "power2.in",
      });

      master.to(
        musicRowRef.current,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.4,
          ease: "back.out(1.8)",
        },
        "-=0.1",
      );

      master.from(
        ".m-bar",
        {
          scaleY: 0,
          duration: 0.2,
          stagger: 0.003,
          transformOrigin: "bottom",
          ease: "power2.out",
        },
        "-=0.2",
      );

      master.call(() => {
        if (!musicRowRef.current || !root) return;
        const rootRect = root.getBoundingClientRect();
        const musicRect = musicRowRef.current.getBoundingClientRect();
        const rightEdgeX = musicRect.right - rootRect.left - 4;
        const centerY = musicRect.top - rootRect.top + musicRect.height / 2 - 4;

        gsap.to(cursorRef.current, {
          x: rightEdgeX,
          y: centerY,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });
      master.to({}, { duration: 0.45 });

      master.to({}, { duration: 0.15 });

      master.call(() => {
        if (!musicRowRef.current || !root) return;
        const rootRect = root.getBoundingClientRect();
        const musicRect = musicRowRef.current.getBoundingClientRect();
        const targetX =
          musicRect.left - rootRect.left + musicRect.width * 0.85 - 4;
        const centerY = musicRect.top - rootRect.top + musicRect.height / 2 - 4;

        gsap.to(cursorRef.current, {
          x: targetX,
          y: centerY,
          duration: 0.5,
          ease: "power2.inOut",
        });

        gsap.to(musicRowRef.current, {
          width: "85%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      });
      master.to({}, { duration: 0.55 });

      master.to(musicRowRef.current, {
        width: "84%",
        duration: 0.08,
        ease: "power1.out",
      });
      master.to(musicRowRef.current, {
        width: "85%",
        duration: 0.12,
        ease: "power2.inOut",
      });

      master.to({}, { duration: 0.2 });

      master.to(cursorRef.current, {
        opacity: 0,
        x: "-=50",
        y: "-=30",
        duration: 0.5,
        ease: "power2.in",
      });

      master.from(
        ".ruler-label",
        { opacity: 0, y: 3, duration: 0.15, stagger: 0.008 },
        "-=0.3",
      );
      master.to(playheadRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      const scrub = gsap.timeline({ repeat: -1 });
      const progress = { t: 0 };
      scrub.fromTo(
        playheadRef.current,
        { left: "0%" },
        { left: "100%", duration: 16, ease: "none" },
      );
      scrub.to(
        progress,
        {
          t: 1,
          duration: 16,
          ease: "none",
          onUpdate: () => {
            if (timeRef.current) {
              const seconds = progress.t * 142.8;
              const m = Math.floor(seconds / 60);
              const s = Math.floor(seconds % 60);
              timeRef.current.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
            }
            if (wavePlayedRef.current && playheadRef.current && musicRowRef.current) {
              const container = playheadRef.current.parentElement;
              if (!container) return;
              const containerRect = container.getBoundingClientRect();
              const playheadRect = playheadRef.current.getBoundingClientRect();
              const waveEl = wavePlayedRef.current.parentElement;
              if (!waveEl) return;
              const waveRect = waveEl.getBoundingClientRect();
              const needleX = playheadRect.left + playheadRect.width / 2;
              const pct = ((needleX - waveRect.left) / waveRect.width) * 100;
              const clamped = Math.max(0, Math.min(100, pct));
              wavePlayedRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
            }
          },
        },
        "<",
      );

    }, root);

    return () => ctx.revert();
  }, [splashDone]);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto mt-0 w-full max-w-[720px] px-4 sm:px-2 md:max-w-[860px] md:px-0 lg:max-w-[920px]"
    >
      <div
        ref={cursorRef}
        className="pointer-events-none absolute -left-4 -top-4 z-50 opacity-0"
      >
        <MousePointer2
          className="h-7 w-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] md:h-8 md:w-8"
          fill="white"
          stroke="rgba(30,30,30,0.7)"
          strokeWidth={1.5}
        />
      </div>

      <div
        ref={ghostRef}
        className={`${GHOST_BASE_CLASSNAME} ${CLIPS[0].ghostClassName}`}
      >
        <span
          ref={ghostLabelRef}
          className="px-2 pb-1.5 text-[8px] font-medium tracking-wider text-white/50"
        />
      </div>

      <div
        ref={musicGhostRef}
        className={MUSIC_GHOST_CLASSNAME}
      >
        <Music className="h-3.5 w-3.5 text-white/40" />
        <span className="text-[9px] font-medium tracking-wider text-white/40">
          Background Music
        </span>
      </div>

      <div className="ruler-label mb-1 opacity-0">
        <div className="flex items-end justify-between">
          {Array.from({ length: 61 }).map((_, i) => (
            <div key={i} className="flex w-px flex-col items-center">
              <div
                className={`w-px ${
                  i % 10 === 0
                    ? "h-[8px] bg-white/20"
                    : i % 5 === 0
                      ? "h-[5px] bg-white/12"
                      : "h-[3px] bg-white/[0.06]"
                }`}
              />
            </div>
          ))}
        </div>
        <span ref={timeRef} className="hidden">
          00:00
        </span>
      </div>

      <div className="relative">
        <div className="flex h-[44px] gap-[2px] sm:h-[52px] md:h-[72px] lg:h-[80px]">
          {CLIPS.map((clip) => (
            <div
              key={clip.id}
              id={`clip-${clip.id}`}
              className={`relative flex h-full shrink-0 items-end overflow-hidden rounded-[10px] opacity-0 ${clip.clipClassName}`}
            >
              <TopHighlight />
              <span className="relative px-1 pb-1 text-[7px] font-medium tracking-wider text-white/40 sm:px-1.5 sm:pb-1.5 sm:text-[8px] md:px-2 md:text-[9px]">
                {clip.label}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={musicRowRef}
          className={MUSIC_ROW_CLASSNAME}
        >
          <TopHighlight />
          <div className="flex h-9 items-center px-2 sm:h-10 sm:px-3 md:h-14 lg:h-16">
            <Music className="mr-1.5 h-3 w-3 shrink-0 text-blue-400/40 sm:mr-2 sm:h-3.5 sm:w-3.5" />
            <span className="mr-2 shrink-0 text-[7px] font-semibold tracking-[0.15em] text-blue-400/30 sm:mr-4 sm:text-[9px]">
              Music
            </span>
            <WaveformBars playedRef={wavePlayedRef} />
          </div>
        </div>

        <div
          ref={playheadRef}
          className="absolute -top-4 left-0 bottom-0 z-30 opacity-0"
        >
          <div className="relative h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="0"
                  width="14"
                  height="10"
                  rx="3"
                  fill="#2979FF"
                />
                <path d="M6 10 L8 14 L10 10" fill="#2979FF" />
                <rect
                  x="3"
                  y="2"
                  width="10"
                  height="4"
                  rx="1.5"
                  fill="rgba(255,255,255,0.2)"
                />
              </svg>
            </div>
            <div className={PLAYHEAD_LINE_CLASSNAME} />
          </div>
        </div>
      </div>
    </div>
  );
}
