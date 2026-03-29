"use client";

import { useState } from "react";
import {
  WAITLIST_MESSAGES,
  isValidWaitlistEmail,
  normalizeWaitlistEmail,
  type WaitlistSubmissionInput,
} from "@klipeo/shared";
import { submitWaitlistEntry } from "../api/client";

export type WaitlistSubmissionStatus = "idle" | "loading" | "success" | "error";

interface UseWaitlistSubmissionOptions {
  onSuccess?: () => void | Promise<void>;
}

export function useWaitlistSubmission({
  onSuccess,
}: UseWaitlistSubmissionOptions = {}) {
  const [status, setStatus] = useState<WaitlistSubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(input: WaitlistSubmissionInput) {
    const email = input.email?.trim() ?? "";

    if (!email) {
      setStatus("error");
      setErrorMessage(WAITLIST_MESSAGES.emailRequired);
      return false;
    }

    if (!isValidWaitlistEmail(email)) {
      setStatus("error");
      setErrorMessage(WAITLIST_MESSAGES.invalidEmail);
      return false;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await submitWaitlistEntry({
        ...input,
        email: normalizeWaitlistEmail(email),
        name: input.name?.trim() || undefined,
        referralSource: input.referralSource?.trim() || undefined,
      });
      setStatus("success");
      await onSuccess?.();
      return true;
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : WAITLIST_MESSAGES.submitFailed,
      );
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setErrorMessage("");
  }

  return {
    errorMessage,
    isSubmitting: status === "loading",
    reset,
    status,
    submit,
  };
}
