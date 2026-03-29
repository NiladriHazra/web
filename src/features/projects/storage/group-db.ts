const DB_NAME = "klipeo-groups";
const DB_VERSION = 1;
const STORE_NAME = "groups";

interface GroupRecord {
  id: string;
  name: string;
  createdAt: string;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txStore(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

function req<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const DEFAULT_GROUP: GroupRecord = {
  id: "default",
  name: "My Projects",
  createdAt: new Date(0).toISOString(),
};

export async function getAllGroups(): Promise<GroupRecord[]> {
  const db = await openDb();
  const records = await req<GroupRecord[]>(txStore(db, "readonly").getAll());
  db.close();
  const hasDefault = records.some((g) => g.id === "default");
  if (!hasDefault) records.unshift(DEFAULT_GROUP);
  return records.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

export async function createGroup(name: string): Promise<GroupRecord> {
  const group: GroupRecord = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString(),
  };
  const db = await openDb();
  await req(txStore(db, "readwrite").put(group));
  db.close();
  return group;
}

export async function renameGroup(id: string, name: string): Promise<void> {
  const db = await openDb();
  const store = txStore(db, "readwrite");
  const existing = await req<GroupRecord | undefined>(store.get(id));
  if (existing) {
    await req(store.put({ ...existing, name }));
  }
  db.close();
}

export async function deleteGroup(id: string): Promise<void> {
  if (id === "default") return;
  const db = await openDb();
  await req(txStore(db, "readwrite").delete(id));
  db.close();
}

export type { GroupRecord };
