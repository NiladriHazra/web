function readRequiredEnv(
  env: Record<string, string | undefined>,
  name: "BETTER_AUTH_SECRET" | "BETTER_AUTH_URL" | "GOOGLE_CLIENT_ID" | "GOOGLE_CLIENT_SECRET",
) {
  const value = env[name];

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

export interface AuthEnv {
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export function readAuthEnv(
  env: Record<string, string | undefined> = process.env,
): AuthEnv {
  return {
    BETTER_AUTH_SECRET: readRequiredEnv(env, "BETTER_AUTH_SECRET"),
    BETTER_AUTH_URL: readRequiredEnv(env, "BETTER_AUTH_URL"),
    GOOGLE_CLIENT_ID: readRequiredEnv(env, "GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: readRequiredEnv(env, "GOOGLE_CLIENT_SECRET"),
  };
}
