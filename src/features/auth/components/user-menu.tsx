"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@klipeo/shared";
import { GhostGlowButton, GlowButton } from "@klipeo/ui";
import { authClient } from "../client";

interface UserMenuProps {
  isAuthenticated?: boolean;
}

interface UserMenuContentProps {
  isAuthenticated: boolean;
  isWaitlist: boolean;
}

function UserMenuContent({
  isAuthenticated,
  isWaitlist,
}: UserMenuContentProps) {
  if (isAuthenticated) {
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

function ClientUserMenu({ isWaitlist }: { isWaitlist: boolean }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  return (
    <UserMenuContent
      isAuthenticated={Boolean(session)}
      isWaitlist={isWaitlist}
    />
  );
}

export function UserMenu({ isAuthenticated }: UserMenuProps) {
  const pathname = usePathname();
  const isWaitlist = pathname === "/waitlist";

  if (typeof isAuthenticated === "boolean") {
    return (
      <UserMenuContent
        isAuthenticated={isAuthenticated}
        isWaitlist={isWaitlist}
      />
    );
  }

  return <ClientUserMenu isWaitlist={isWaitlist} />;
}
