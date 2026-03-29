import { describe, expect, test } from "bun:test";
import { getPostSignInRoute, normalizeUserRole, USER_ROLES } from "./roles";

describe("normalizeUserRole", () => {
  test("defaults unknown roles to user", () => {
    expect(normalizeUserRole("owner")).toEqual(USER_ROLES.user);
    expect(normalizeUserRole(undefined)).toEqual(USER_ROLES.user);
  });

  test("preserves admin role", () => {
    expect(normalizeUserRole("admin")).toEqual(USER_ROLES.admin);
  });
});

describe("getPostSignInRoute", () => {
  test("sends admins to the admin dashboard", () => {
    expect(getPostSignInRoute("admin")).toEqual("/admin");
  });

  test("sends regular users to projects", () => {
    expect(getPostSignInRoute("user")).toEqual("/projects");
  });
});
