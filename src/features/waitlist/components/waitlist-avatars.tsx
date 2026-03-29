import { forwardRef } from "react";
import Avatar from "boring-avatars";
import type { WaitlistMember } from "@klipeo/shared";

interface WaitlistAvatarsProps {
  members: WaitlistMember[];
  firstSlotRef?: React.RefObject<HTMLDivElement | null>;
}

export const AVATAR_COLORS = [
  "#c06058",
  "#c4973a",
  "#6ba35e",
  "#4a9eab",
  "#5588cc",
  "#8e6bbf",
  "#c47a4a",
  "#5cb08a",
] as const;

const MAX_VISIBLE = 15;

export const WaitlistAvatars = forwardRef<HTMLDivElement, WaitlistAvatarsProps>(
  function WaitlistAvatars({ members, firstSlotRef }, ref) {
    if (members.length === 0) return null;

    const visible = members.slice(0, MAX_VISIBLE);
    const remaining = members.length - MAX_VISIBLE;

    return (
      <div ref={ref} className="flex flex-wrap items-center justify-center gap-3">
        {visible.map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            ref={index === 0 ? firstSlotRef : undefined}
            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 shadow-[0_0_12px_rgba(255,255,255,0.04)] sm:h-16 sm:w-16"
            title={member.name}
          >
            <Avatar
              size={64}
              name={member.name}
              variant="beam"
              colors={[...AVATAR_COLORS]}
            />
          </div>
        ))}
        {remaining > 0 && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 sm:h-16 sm:w-16">
            <span className="text-sm font-semibold text-white/40">
              +{remaining}
            </span>
          </div>
        )}
      </div>
    );
  },
);
