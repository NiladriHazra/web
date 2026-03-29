import Image from "next/image";
import type { WaitlistOverview } from "@klipeo/shared";
import { EMPTY_WAITLIST_OVERVIEW } from "@klipeo/shared";
import { Footer, Header } from "@/features/marketing";
import { SmokeBackground } from "@/shared/components/smoke-background";
import {
  WAITLIST_HAND_IMAGE_URL,
  WAITLIST_STATUE_IMAGE_URL,
} from "../lib/constants";
import { WaitlistClient } from "./waitlist-client";

interface WaitlistPageProps {
  initialOverview?: WaitlistOverview;
}

export function WaitlistPage({
  initialOverview = EMPTY_WAITLIST_OVERVIEW,
}: WaitlistPageProps) {
  return (
    <>
      <Header />
      <div className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip">
        <div className="absolute inset-0 -z-10">
          <SmokeBackground smokeColor="#162b4a" />
        </div>

        <WaitlistClient
          initialOverview={initialOverview}
          imagesBefore={
            <Image
              src={WAITLIST_STATUE_IMAGE_URL}
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 90vw, 640px"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-contain"
            />
          }
          imagesAfter={
            <Image
              src={WAITLIST_HAND_IMAGE_URL}
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 90vw, 640px"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-contain"
            />
          }
        />

        <Footer />
      </div>
    </>
  );
}
