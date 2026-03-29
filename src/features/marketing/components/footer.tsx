import Link from "next/link";
import { siteConfig } from "@klipeo/shared";
import { XIcon } from "@/shared/components/icons/x-icon";
import { BrandLogo } from "./brand-logo";

export function Footer() {
  return (
    <footer className="relative">
      <div className="pt-16" />
      <div className="relative flex items-center justify-center">
        <div
          className="pointer-events-none absolute h-32 w-64 rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.06)_0%,transparent_70%)] sm:h-40 sm:w-96 md:h-48 md:w-[500px]"
        />
        <span
          className="pointer-events-none relative select-none bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_100%)] bg-clip-text text-[5rem] text-transparent font-black uppercase leading-none tracking-tighter [-webkit-background-clip:text] [-webkit-mask-image:linear-gradient(to_bottom,white_10%,transparent_95%)] [-webkit-text-fill-color:transparent] [mask-image:linear-gradient(to_bottom,white_10%,transparent_95%)] sm:text-[8rem] md:text-[12rem]"
          aria-hidden="true"
        >
          KLIPEO
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-8">
        <div className="border-t border-white/[0.06]" />
        <div className="flex items-center justify-between py-6">
          <BrandLogo size="sm" />

          <span className="text-[0.7rem] tracking-wide text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>

          <Link
            href={siteConfig.social.x}
            className="text-white/30 transition-colors hover:text-white/60"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}
