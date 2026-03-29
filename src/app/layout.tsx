import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Geist } from "next/font/google";
import { siteConfig } from "@klipeo/shared";
import {
  WAITLIST_HAND_IMAGE_URL,
  WAITLIST_STATUE_IMAGE_URL,
} from "@/features/waitlist/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import { PageTransitionOverlay } from "@/shared/components/page-transition-overlay";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
        <link rel="preload" href={WAITLIST_STATUE_IMAGE_URL} as="image" type="image/webp" />
        <link rel="preload" href={WAITLIST_HAND_IMAGE_URL} as="image" type="image/webp" />
      </head>
      <body
        className={`${bricolage.variable} ${caveat.variable} overflow-x-hidden font-sans antialiased`}
      >
        <PageTransitionOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
