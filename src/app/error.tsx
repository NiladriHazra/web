"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@klipeo/shared";
import { Header } from "@/features/marketing/components/header";
import { Footer } from "@/features/marketing/components/footer";

function GeometricSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 191.09 830.03"
      className="block h-full w-auto fill-white/10"
    >
      <path d="M0,105.4v-2.85M0,614.39v-2.85M0,758.63v-2.85M67.65,830H53.37" />
      <path d="M69.24,521.76,190.92,359a.87.87,0,0,0,0-1L69.24,195.18a7.94,7.94,0,0,1-1.59-4.79V0H65.94V166.7a8,8,0,0,1-14.41,4.79L0,102.55v2.85l64.35,86.08a8,8,0,0,1,1.59,4.79V349.16a8,8,0,0,1-8,8H0v2H57.94a8,8,0,0,1,8,8V520.67a8.05,8.05,0,0,1-1.59,4.79L0,611.54v2.85l51.53-68.94a8,8,0,0,1,14.41,4.79V819.93a8,8,0,0,1-14.41,4.79L0,755.78v2.85L53.37,830H67.65V526.55A7.94,7.94,0,0,1,69.24,521.76ZM67.65,220a8,8,0,0,1,14.4-4.79l96.58,129.2a8,8,0,0,1-6.41,12.79H75.65a8,8,0,0,1-8-8Zm0,147.2a8,8,0,0,1,8-8h97a8,8,0,0,1,6.4,12.79l-97,129.82A8,8,0,0,1,67.65,497Z" />
    </svg>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background pt-16">
        <div className="pointer-events-none absolute inset-0 top-16 flex items-stretch justify-between">
          <GeometricSvg />
          <div className="-scale-x-100">
            <GeometricSvg />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="text-center text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Something
            went wrong
            <br />
            <span className="font-caveat italic text-white/70">
              please try again
            </span>
          </h1>
          <p className="mt-8 max-w-sm text-center text-sm uppercase tracking-widest text-white/40">
            Retry the request or return to the homepage and continue from a
            clean state.
          </p>
         
        </div>
      </main>
      <Footer />
    </>
  );
}
