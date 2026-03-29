import type { ReactNode } from "react";
import { requireAdminSession } from "@/features/auth/session";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b border-sidebar-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm text-muted-foreground">Admin Panel</span>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
