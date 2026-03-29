import { describe, expect, test } from "bun:test";
import { readAuthEnv } from "./env";

describe("readAuthEnv", () => {
  test("returns validated auth settings", () => {
    expect(
      readAuthEnv({
        BETTER_AUTH_SECRET: "secret",
        BETTER_AUTH_URL: "http://localhost:3000",
        GOOGLE_CLIENT_ID: "google-client-id",
        GOOGLE_CLIENT_SECRET: "google-client-secret",
      }),
    ).toEqual({
      BETTER_AUTH_SECRET: "secret",
      BETTER_AUTH_URL: "http://localhost:3000",
      GOOGLE_CLIENT_ID: "google-client-id",
      GOOGLE_CLIENT_SECRET: "google-client-secret",
    });
  });

  test("throws on missing auth variables", () => {
    expect(() =>
      readAuthEnv({
        BETTER_AUTH_URL: "http://localhost:3000",
        GOOGLE_CLIENT_ID: "google-client-id",
        GOOGLE_CLIENT_SECRET: "google-client-secret",
      }),
    ).toThrow("BETTER_AUTH_SECRET is required.");
  });
});
