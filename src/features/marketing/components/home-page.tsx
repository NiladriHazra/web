"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@klipeo/shared";
import { useRouter } from "next/navigation";
import { SmokeBackground } from "@/shared/components/smoke-background";
import { prefetchWaitlistOverview } from "@/features/waitlist/api/client";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./landing/hero";
import { SplashScreen } from "./splash-screen";

const SPLASH_KEY = "klipeo-splash-seen";

function getHasSeenSplash() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SPLASH_KEY) === "1";
}

export function HomePage() {
  const router = useRouter();
  const hasSeen = useSyncExternalStore(
    () => () => {},
    () => getHasSeenSplash(),
    () => false,
  );

  const [splashDone, setSplashDone] = useState(hasSeen);
  const [showSplash] = useState(!hasSeen);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setSplashDone(true);
  }, []);

  useEffect(() => {
    router.prefetch(siteConfig.routes.waitlist);

    void prefetchWaitlistOverview();
  }, [router]);

  return (
    <>
      {showSplash && !splashDone && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <div className="relative min-h-svh">
        <div className="absolute inset-0 -z-10">
          <SmokeBackground smokeColor="#162b4a" />
        </div>
        <Header />
        <Hero splashDone={splashDone} />
        <Footer />
      </div>
    </>
  );
}
