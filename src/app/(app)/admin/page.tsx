import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultipleIcon,
  MailAtSign01Icon,
  SecurityCheckIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { requireAdminSession } from "@/features/auth/session";
import {
  getRecentUsers,
  getUserCount,
  getWaitlistCount,
} from "@/features/admin/server/admin-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/features/admin/components/stat-card";
import { UserRoleSelect } from "@/features/admin/components/user-role-select";
import { AdminPageTransition } from "@/features/admin/components/admin-page-transition";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const currentUserId = String(session.user.id);

  const [recentUsers, userCount, waitlistCount] = await Promise.all([
    getRecentUsers(),
    getUserCount(),
    getWaitlistCount(),
  ]);

  return (
    <AdminPageTransition>
      <div className="p-6 md:p-8">
        <div data-animate>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {session?.user.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your platform.
          </p>
        </div>

        <div data-animate className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Users"
            value={userCount}
            icon={<HugeiconsIcon icon={UserMultipleIcon} size={22} />}
          />
          <StatCard
            label="Waitlist"
            value={waitlistCount}
            icon={<HugeiconsIcon icon={MailAtSign01Icon} size={22} />}
          />
          <StatCard
            label="Your Role"
            value={session?.user.role ?? "user"}
            icon={<HugeiconsIcon icon={SecurityCheckIcon} size={22} />}
          />
        </div>

        <Card data-animate className="mt-8">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={18}
                className="text-muted-foreground"
              />
              Recent Users
            </CardTitle>
            <Badge variant="outline">{recentUsers.length} shown</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {user.image && <AvatarImage src={user.image} />}
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground sm:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-muted-foreground">{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <UserRoleSelect
                        userId={user.id}
                        role={user.role}
                        isSelf={String(user.id) === currentUserId}
                      />
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {user.createdAt.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminPageTransition>
  );
}
