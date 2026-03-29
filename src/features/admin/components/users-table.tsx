"use client";

import { useTransition } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoleSelect } from "./user-role-select";
import { deleteUserAction } from "../server/actions";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string | null;
  image: string | null;
  createdAt: Date;
}

interface UsersTableProps {
  users: UserRow[];
  currentUserId: string;
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (userId: number) => {
    startTransition(() => deleteUserAction(userId));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isSelf = String(user.id) === currentUserId;

          return (
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
                  isSelf={isSelf}
                />
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {user.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {isSelf ? (
                  <Badge className="bg-amber-500/15 text-amber-400 hover:bg-amber-500/20">
                    You
                  </Badge>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(user.id)}
                    disabled={isPending}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
