import { NextResponse } from "next/server";
import {
  EMPTY_WAITLIST_OVERVIEW,
  WAITLIST_MESSAGES,
  type WaitlistSubmissionInput,
  type WaitlistSuccessResponse,
} from "@klipeo/shared";
import {
  createWaitlistEntry,
  getWaitlistOverview,
} from "@/features/waitlist/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

async function readSubmissionInput(
  request: Request,
): Promise<WaitlistSubmissionInput | null> {
  try {
    return (await request.json()) as WaitlistSubmissionInput;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const input = await readSubmissionInput(request);

  if (!input) {
    return errorResponse(WAITLIST_MESSAGES.invalidRequestBody, 400);
  }

  try {
    const result = await createWaitlistEntry(input);

    if (!result.ok) {
      return errorResponse(result.error, result.status);
    }

    return NextResponse.json({
      success: true,
    } satisfies WaitlistSuccessResponse);
  } catch (error) {
    console.error("[waitlist] Error:", error);
    return errorResponse(WAITLIST_MESSAGES.internalServer, 500);
  }
}

export async function GET() {
  try {
    return NextResponse.json(await getWaitlistOverview());
  } catch (error) {
    console.error("[waitlist] GET Error:", error);
    return NextResponse.json(EMPTY_WAITLIST_OVERVIEW, { status: 500 });
  }
}
