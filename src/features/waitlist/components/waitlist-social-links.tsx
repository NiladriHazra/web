import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@klipeo/shared";
import { XIcon } from "@/shared/components/icons/x-icon";

const SOCIAL_LINK_CLASSNAME =
  "flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs text-white/30 transition-colors hover:text-white/60";

export function WaitlistSocialLinks() {
  return (
    <div className="z-10 mt-8 flex items-center gap-3 pb-8">
      <Link
        href={siteConfig.social.x}
        target="_blank"
        rel="noopener noreferrer"
        className={SOCIAL_LINK_CLASSNAME}
      >
        <XIcon className="h-3 w-3" />
        Follow on X
      </Link>
      <Link
        href={siteConfig.social.discord}
        target="_blank"
        rel="noopener noreferrer"
        className={SOCIAL_LINK_CLASSNAME}
      >
        <Image
          src="/images/discord-icon.png"
          alt=""
          width={12}
          height={12}
          className="h-3 w-3"
        />
        Join Discord
      </Link>
    </div>
  );
}
