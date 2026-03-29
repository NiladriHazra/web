import { requireSession } from "@/features/auth/session";

export default async function ProjectsPage() {
  const session = await requireSession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-2xl font-semibold text-white">
        Welcome, {session.user.name}
      </h1>
    </main>
  );
}
