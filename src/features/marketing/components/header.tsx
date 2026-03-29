"use client";

import Link from "next/link";
import { siteConfig } from "@klipeo/shared";
import { BrandLogo } from "./brand-logo";
import { UserMenu } from "@/features/auth/components/user-menu";

export function Header() {
  return (
    <header className="absolute top-0 left-0 z-20 w-full">
      <div className="flex items-center justify-between px-4 pt-4 md:px-6 md:pt-5">
        <Link
          href={siteConfig.routes.home}
          className="flex items-center gap-1.5 md:gap-2"
        >
          <BrandLogo size="lg" className="flex items-center" />
          <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
            {siteConfig.name}
          </span>
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
