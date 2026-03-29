import { EMPTY_WAITLIST_OVERVIEW } from "@klipeo/shared";
import { getWaitlistOverview } from "@/features/waitlist/server";
import { WaitlistPage } from "@/features/waitlist";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function readInitialOverview() {
  try {
    return await getWaitlistOverview();
  } catch (error) {
    console.error("[waitlist] Failed to read initial overview:", error);
    return EMPTY_WAITLIST_OVERVIEW;
  }
}

export default async function Waitlist() {
  const overview = await readInitialOverview();

  return <WaitlistPage initialOverview={overview} />;
}
