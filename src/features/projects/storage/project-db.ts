const DB_NAME = "klipeo-projects";
const DB_VERSION = 1;
const STORE_NAME = "projects";

interface ProjectRecord {
  id: string;
  name: string;
  groupId: string;
  thumbnail: string | null;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("groupId", "groupId", { unique: false });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
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

export async function getAllProjects(): Promise<ProjectRecord[]> {
  const db = await openDb();
  const records = await req<ProjectRecord[]>(txStore(db, "readonly").getAll());
  db.close();
  return records.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getProject(id: string): Promise<ProjectRecord | undefined> {
  const db = await openDb();
  const record = await req<ProjectRecord | undefined>(
    txStore(db, "readonly").get(id),
  );
  db.close();
  return record;
}

export async function createProject(
  name: string,
  groupId: string,
): Promise<ProjectRecord> {
  const now = new Date().toISOString();
  const project: ProjectRecord = {
    id: crypto.randomUUID(),
    name,
    groupId,
    thumbnail: null,
    duration: 0,
    createdAt: now,
    updatedAt: now,
  };
  const db = await openDb();
  await req(txStore(db, "readwrite").put(project));
  db.close();
  return project;
}

export async function updateProject(
  id: string,
  data: Partial<Pick<ProjectRecord, "name" | "groupId" | "thumbnail" | "duration">>,
): Promise<void> {
  const db = await openDb();
  const store = txStore(db, "readwrite");
  const existing = await req<ProjectRecord | undefined>(store.get(id));
  if (!existing) {
    db.close();
    return;
  }
  await req(
    store.put({ ...existing, ...data, updatedAt: new Date().toISOString() }),
  );
  db.close();
}

export async function deleteProject(id: string): Promise<void> {
  const db = await openDb();
  await req(txStore(db, "readwrite").delete(id));
  db.close();
}

export type { ProjectRecord };
