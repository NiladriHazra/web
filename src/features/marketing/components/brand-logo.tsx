import Image from "next/image";
import { siteConfig } from "@klipeo/shared";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: 28,
  md: 32,
  lg: 48,
} as const;

export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  const px = SIZES[size];
  return (
    <div className={className}>
      <Image
        src={siteConfig.assets.logo}
        alt={siteConfig.name}
        width={px}
        height={px}
        className="shrink-0"
      />
    </div>
  );
}
