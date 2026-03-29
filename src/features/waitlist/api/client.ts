import {
  WAITLIST_MESSAGES,
  EMPTY_WAITLIST_OVERVIEW,
  type WaitlistErrorResponse,
  type WaitlistOverview,
  type WaitlistSubmissionInput,
} from "@klipeo/shared";

const WAITLIST_ENDPOINT = "/api/waitlist";
const WAITLIST_OVERVIEW_CACHE = {
  data: null as WaitlistOverview | null,
  promise: null as Promise<WaitlistOverview> | null,
};

async function readWaitlistError(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  try {
    const payload = (await response.json()) as Partial<WaitlistErrorResponse>;
    return typeof payload.error === "string" ? payload.error : fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

function setCachedWaitlistOverview(overview: WaitlistOverview) {
  WAITLIST_OVERVIEW_CACHE.data = overview;
  WAITLIST_OVERVIEW_CACHE.promise = null;
  return overview;
}

export function getCachedWaitlistOverview() {
  return WAITLIST_OVERVIEW_CACHE.data;
}

export async function fetchWaitlistOverview(): Promise<WaitlistOverview> {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      await readWaitlistError(response, WAITLIST_MESSAGES.loadFailed),
    );
  }

  return setCachedWaitlistOverview((await response.json()) as WaitlistOverview);
}

export function prefetchWaitlistOverview() {
  if (WAITLIST_OVERVIEW_CACHE.data) {
    return Promise.resolve(WAITLIST_OVERVIEW_CACHE.data);
  }

  if (WAITLIST_OVERVIEW_CACHE.promise) {
    return WAITLIST_OVERVIEW_CACHE.promise;
  }

  WAITLIST_OVERVIEW_CACHE.promise = fetchWaitlistOverview().catch(() => {
    WAITLIST_OVERVIEW_CACHE.promise = null;
    return EMPTY_WAITLIST_OVERVIEW;
  });

  return WAITLIST_OVERVIEW_CACHE.promise;
}

export async function submitWaitlistEntry(
  input: WaitlistSubmissionInput,
): Promise<void> {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(
      await readWaitlistError(response, WAITLIST_MESSAGES.submitFailed),
    );
  }
}
