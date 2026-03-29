import type { RefObject } from "react";

const BAR_COUNT = 300;
const VIEW_HEIGHT = 40;
const VIEW_WIDTH = 1000;
const STEP = VIEW_WIDTH / BAR_COUNT;
const BAR_WIDTH = STEP * 0.55;

function seededRandom(seed: number) {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const WAVEFORM_BARS = Array.from({ length: BAR_COUNT }, (_, index) => {
  const r1 = seededRandom(index);
  const r2 = seededRandom(index + 300);
  const avg = (r1 + r2) / 2;
  const half = 1.5 + avg * 15;

  return {
    x: index * STEP + (STEP - BAR_WIDTH) / 2,
    half,
  };
});

function WaveformSvg({ fill }: { fill: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {WAVEFORM_BARS.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={VIEW_HEIGHT / 2 - bar.half}
          width={BAR_WIDTH}
          height={bar.half * 2}
          rx={BAR_WIDTH / 2}
          fill={fill}
        />
      ))}
    </svg>
  );
}

interface WaveformBarsProps {
  playedRef?: RefObject<HTMLDivElement | null>;
}

export function WaveformBars({ playedRef }: WaveformBarsProps) {
  return (
    <div className="relative h-[70%] flex-1 overflow-hidden">
      <WaveformSvg fill="rgba(255,255,255,0.13)" />
      <div
        ref={playedRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <WaveformSvg fill="rgba(255,255,255,0.4)" />
      </div>
    </div>
  );
}
