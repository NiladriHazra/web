"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@klipeo/shared";
import { GhostGlowButton, GlowButton } from "@klipeo/ui";
import { authClient } from "../client";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const isWaitlist = pathname === "/waitlist";

  if (isPending) return null;

  if (session) {
    return (
      <Link href={siteConfig.routes.projects}>
        <GhostGlowButton>Projects</GhostGlowButton>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={siteConfig.routes.signIn}>
        <GhostGlowButton>Sign In</GhostGlowButton>
      </Link>
      {!isWaitlist && (
        <Link href={siteConfig.routes.waitlist} prefetch>
          <GlowButton>Export</GlowButton>
        </Link>
      )}
    </div>
  );
}
