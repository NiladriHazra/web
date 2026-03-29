import "server-only";

import {
  EMPTY_WAITLIST_OVERVIEW,
  WAITLIST_MESSAGES,
  toWaitlistMember,
  validateWaitlistSubmission,
  type WaitlistOverview,
  type WaitlistSubmissionInput,
} from "@klipeo/shared";
import { count, desc, getDb, schema } from "@klipeo/database";

type CreateWaitlistEntryResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export async function createWaitlistEntry(
  input: WaitlistSubmissionInput,
): Promise<CreateWaitlistEntryResult> {
  const parsedInput = validateWaitlistSubmission(input);
  const database = getDb();

  if (!parsedInput.data) {
    return {
      ok: false,
      error: parsedInput.error,
      status: 400,
    };
  }

  const [createdEntry] = await database
    .insert(schema.waitlist)
    .values(parsedInput.data)
    .onConflictDoNothing({ target: schema.waitlist.email })
    .returning({ id: schema.waitlist.id });

  if (!createdEntry) {
    return {
      ok: false,
      error: WAITLIST_MESSAGES.duplicateEmail,
      status: 409,
    };
  }

  return { ok: true };
}

export async function getWaitlistOverview(): Promise<WaitlistOverview> {
  const database = getDb();
  const [totalRows, recentMembers] = await Promise.all([
    database.select({ value: count() }).from(schema.waitlist),
    database
      .select({
        email: schema.waitlist.email,
        name: schema.waitlist.name,
      })
      .from(schema.waitlist)
      .orderBy(desc(schema.waitlist.createdAt))
      .limit(20),
  ]);
  const [totalResult] = totalRows;

  return {
    total: totalResult?.value ?? EMPTY_WAITLIST_OVERVIEW.total,
    members: recentMembers.map(toWaitlistMember),
  };
}
