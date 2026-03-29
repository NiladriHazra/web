"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@klipeo/shared";

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
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-400/80">
          Something broke
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          The app hit an unexpected error
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Try the request again. If it keeps failing, return home and retry from
          a clean state.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/5"
          >
            Retry
          </button>
          <Link
            href={siteConfig.routes.home}
            className="rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-500/15"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
