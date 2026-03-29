import type { RefObject } from "react";
import type { WaitlistOverview as WaitlistOverviewData } from "@klipeo/shared";
import { WaitlistAvatars } from "./waitlist-avatars";

interface WaitlistOverviewProps {
  className?: string;
  overview: WaitlistOverviewData;
  firstSlotRef?: RefObject<HTMLDivElement | null>;
}

export function WaitlistOverview({
  className,
  overview,
  firstSlotRef,
}: WaitlistOverviewProps) {
  if (overview.total === 0) {
    return null;
  }

  return (
    <div
      className={[
        "flex w-full max-w-3xl flex-col items-center gap-6 px-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-sm font-medium italic tracking-wide text-white/40">
        Already Joined The Waitlist
      </p>
      <WaitlistAvatars members={overview.members} firstSlotRef={firstSlotRef} />
      <p className="text-xs text-white/25">
        {overview.total} {overview.total === 1 ? "person has" : "people have"}{" "}
        joined
      </p>
    </div>
  );
}
