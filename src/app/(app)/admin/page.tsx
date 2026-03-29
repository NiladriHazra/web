import { requireAdminSession } from "@/features/auth/session";

export default async function AdminPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-300/80">
          Admin Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Welcome back, {session.user.name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
          This area is restricted to users whose role is set to
          <span className="mx-1 rounded bg-white/10 px-2 py-0.5 font-medium text-white">
            admin
          </span>
          in the auth users table.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Access Level
            </p>
            <p className="mt-3 text-2xl font-semibold capitalize">
              {session.user.role}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Signed In As
            </p>
            <p className="mt-3 text-2xl font-semibold">{session.user.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Next Step
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Replace this placeholder with your real admin analytics and
              controls.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
