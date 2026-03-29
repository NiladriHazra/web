import "server-only";

import { getDb, schema, count, desc, eq, ilike, or } from "@klipeo/database";

const PAGE_SIZE = 15;

export async function getUsers(page: number, search?: string) {
  const db = getDb();
  const offset = (page - 1) * PAGE_SIZE;
  const filter = search
    ? or(
        ilike(schema.users.name, `%${search}%`),
        ilike(schema.users.email, `%${search}%`),
      )
    : undefined;

  const [rows, [total]] = await Promise.all([
    db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        image: schema.users.image,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .where(filter)
      .orderBy(desc(schema.users.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db.select({ total: count() }).from(schema.users).where(filter),
  ]);
  return {
    rows,
    total: total?.total ?? 0,
    totalPages: Math.ceil((total?.total ?? 0) / PAGE_SIZE),
  };
}

export async function getWaitlistEntries(page: number, search?: string) {
  const db = getDb();
  const offset = (page - 1) * PAGE_SIZE;
  const filter = search
    ? or(
        ilike(schema.waitlist.name, `%${search}%`),
        ilike(schema.waitlist.email, `%${search}%`),
      )
    : undefined;

  const [rows, [total]] = await Promise.all([
    db
      .select({
        id: schema.waitlist.id,
        name: schema.waitlist.name,
        email: schema.waitlist.email,
        createdAt: schema.waitlist.createdAt,
      })
      .from(schema.waitlist)
      .where(filter)
      .orderBy(desc(schema.waitlist.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db.select({ total: count() }).from(schema.waitlist).where(filter),
  ]);
  return {
    rows,
    total: total?.total ?? 0,
    totalPages: Math.ceil((total?.total ?? 0) / PAGE_SIZE),
  };
}

export async function getUserCount() {
  const db = getDb();
  const [result] = await db.select({ total: count() }).from(schema.users);
  return result?.total ?? 0;
}

export async function getWaitlistCount() {
  const db = getDb();
  const [result] = await db.select({ total: count() }).from(schema.waitlist);
  return result?.total ?? 0;
}

export async function getRecentUsers(limit = 5) {
  const db = getDb();
  return db
    .select({
      id: schema.users.id,
      name: schema.users.name,
      email: schema.users.email,
      role: schema.users.role,
      image: schema.users.image,
      createdAt: schema.users.createdAt,
    })
    .from(schema.users)
    .orderBy(desc(schema.users.createdAt))
    .limit(limit);
}

export async function deleteUser(userId: number) {
  const db = getDb();
  await db.delete(schema.users).where(eq(schema.users.id, userId));
}

export async function updateUserRole(userId: number, role: string) {
  const db = getDb();
  const [updatedUser] = await db
    .update(schema.users)
    .set({ role, updatedAt: new Date() })
    .where(eq(schema.users.id, userId))
    .returning({
      id: schema.users.id,
      role: schema.users.role,
    });

  return updatedUser ?? null;
}
