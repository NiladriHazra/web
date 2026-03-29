"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/features/auth/session";
import { deleteUser, updateUserRole } from "./admin-service";

export async function deleteUserAction(userId: number) {
  await requireAdminSession();
  await deleteUser(userId);
  revalidatePath("/admin");
  revalidatePath("/admin/users");
}

export async function updateUserRoleAction(userId: number, role: string) {
  await requireAdminSession();
  const updatedUser = await updateUserRole(userId, role);

  if (!updatedUser) {
    throw new Error("User not found.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    ok: true as const,
    role: updatedUser.role ?? "user",
  };
}
