import { siteConfig } from "@klipeo/shared";

export const USER_ROLES = {
  admin: "admin",
  user: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export function normalizeUserRole(role: unknown): UserRole {
  return role === USER_ROLES.admin ? USER_ROLES.admin : USER_ROLES.user;
}

export function getPostSignInRoute(role: unknown) {
  return normalizeUserRole(role) === USER_ROLES.admin
    ? siteConfig.routes.admin
    : siteConfig.routes.projects;
}
