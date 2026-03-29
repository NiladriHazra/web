import { getCurrentSession } from "@/features/auth/session";
import { HomePage } from "@/features/marketing";

export default async function Home() {
  const session = await getCurrentSession();

  return <HomePage isAuthenticated={Boolean(session)} />;
}
