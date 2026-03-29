"use client";

import { useCallback, useEffect, useState } from "react";
import { EMPTY_WAITLIST_OVERVIEW, type WaitlistOverview } from "@klipeo/shared";
import {
  fetchWaitlistOverview,
  getCachedWaitlistOverview,
} from "../api/client";

function resolveInitialOverview(initialOverview: WaitlistOverview) {
  const cachedOverview = getCachedWaitlistOverview();

  if (!cachedOverview) {
    return initialOverview;
  }

  return cachedOverview.total > initialOverview.total
    ? cachedOverview
    : initialOverview;
}

export function useWaitlistOverview(
  initialOverview: WaitlistOverview = EMPTY_WAITLIST_OVERVIEW,
) {
  const [overview, setOverview] = useState(resolveInitialOverview(initialOverview));

  const refresh = useCallback(async () => {
    try {
      setOverview(await fetchWaitlistOverview());
    } catch {
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    overview,
    refresh,
  };
}
