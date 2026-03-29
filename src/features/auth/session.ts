import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { siteConfig } from "@klipeo/shared";
import { auth } from "./server";
import { getPostSignInRoute, normalizeUserRole, USER_ROLES } from "./roles";

export const getCurrentSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

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
    redirect(getPostSignInRoute(session.user.role));
  }
}

export async function requireAdminSession() {
  const session = await requireSession();

  if (normalizeUserRole(session.user.role) !== USER_ROLES.admin) {
    notFound();
  }

  return session;
}
