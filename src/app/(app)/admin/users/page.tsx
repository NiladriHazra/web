import { HugeiconsIcon } from "@hugeicons/react";
import { UserMultipleIcon } from "@hugeicons/core-free-icons";
import { requireAdminSession } from "@/features/auth/session";
import { getUsers } from "@/features/admin/server/admin-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsersTable } from "@/features/admin/components/users-table";
import { TablePagination } from "@/features/admin/components/table-pagination";
import { TableSearch } from "@/features/admin/components/table-search";
import { AdminPageTransition } from "@/features/admin/components/admin-page-transition";

interface AdminUsersPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const params = await searchParams;
  const session = await requireAdminSession();
  const page = Math.max(1, Number(params.page) || 1);
  const search = params.q || undefined;
  const { rows, total, totalPages } = await getUsers(page, search);

  return (
    <AdminPageTransition>
      <div className="p-6 md:p-8">
        <div data-animate>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage user accounts and roles.
          </p>
        </div>

        <Card data-animate className="mt-8">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                size={18}
                className="text-muted-foreground"
              />
              All Users
            </CardTitle>
            <div className="flex items-center gap-3">
              <TableSearch placeholder="Search users..." />
              <Badge variant="outline">{total} total</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <UsersTable
              users={rows}
              currentUserId={String(session?.user.id)}
            />
            <TablePagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/admin/users"
              searchQuery={search}
            />
          </CardContent>
        </Card>
      </div>
    </AdminPageTransition>
  );
}
