import type { ReactNode } from "react";
import { requireSession } from "@/features/auth/session";

export const runtime = "nodejs";

export default async function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireSession();

  return children;
}
