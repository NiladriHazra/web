import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { siteConfig } from "@klipeo/shared";
import { eq, getDb, schema } from "@klipeo/database";
import { auth } from "./server";
import { getPostSignInRoute, normalizeUserRole, USER_ROLES } from "./roles";

export const getCurrentSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

async function getLatestUserRole(userId: number | string | undefined) {
  if (userId === undefined) {
    return USER_ROLES.user;
  }

  const db = getDb();
  const numericUserId =
    typeof userId === "number" ? userId : Number.parseInt(userId, 10);

  if (Number.isNaN(numericUserId)) {
    return USER_ROLES.user;
  }

  const [user] = await db
    .select({ role: schema.users.role })
    .from(schema.users)
    .where(eq(schema.users.id, numericUserId))
    .limit(1);

  return normalizeUserRole(user?.role);
}

export async function requireSession() {
  const session = await getCurrentSession();

  if (!session) {
    redirect(siteConfig.routes.signIn);
  }

  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getCurrentSession();

  if (session) {
    const role = await getLatestUserRole(session.user.id);
    redirect(getPostSignInRoute(role));
  }
}

export async function requireAdminSession() {
  const session = await requireSession();
  const role = await getLatestUserRole(session.user.id);

  if (role !== USER_ROLES.admin) {
    notFound();
  }

  return {
    ...session,
    user: {
      ...session.user,
      role,
    },
  };
}
