import Link from "next/link";
import { siteConfig } from "@klipeo/shared";
import { BrandLogo } from "@/features/marketing/components/brand-logo";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { redirectIfAuthenticated } from "@/features/auth/session";

export const runtime = "nodejs";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Link href={siteConfig.routes.home} className="flex items-center gap-2">
            <BrandLogo size="lg" />
            <span className="text-xl font-semibold tracking-tight text-white">
              {siteConfig.name}
            </span>
          </Link>
          <h1 className="text-lg font-medium text-white/60">
            Sign in to continue
          </h1>
        </div>

        <GoogleSignInButton />

        <p className="text-center text-sm text-white/40">
          <Link
            href={siteConfig.routes.home}
            className="transition-colors hover:text-white/60"
          >
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
