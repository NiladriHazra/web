import { HugeiconsIcon } from "@hugeicons/react";
import { MailAtSign01Icon } from "@hugeicons/core-free-icons";
import { getWaitlistEntries } from "@/features/admin/server/admin-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WaitlistTable } from "@/features/admin/components/waitlist-table";
import { TablePagination } from "@/features/admin/components/table-pagination";
import { TableSearch } from "@/features/admin/components/table-search";
import { AdminPageTransition } from "@/features/admin/components/admin-page-transition";

interface AdminWaitlistPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function AdminWaitlistPage({
  searchParams,
}: AdminWaitlistPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const search = params.q || undefined;
  const { rows, total, totalPages } = await getWaitlistEntries(page, search);

  return (
    <AdminPageTransition>
      <div className="p-6 md:p-8">
        <div data-animate>
          <h1 className="text-2xl font-semibold tracking-tight">Waitlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everyone who signed up for early access.
          </p>
        </div>

        <Card data-animate className="mt-8">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <HugeiconsIcon
                icon={MailAtSign01Icon}
                size={18}
                className="text-muted-foreground"
              />
              All Entries
            </CardTitle>
            <div className="flex items-center gap-3">
              <TableSearch placeholder="Search entries..." />
              <Badge variant="outline">{total} total</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <WaitlistTable entries={rows} />
            <TablePagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/admin/waitlist"
              searchQuery={search}
            />
          </CardContent>
        </Card>
      </div>
    </AdminPageTransition>
  );
}
