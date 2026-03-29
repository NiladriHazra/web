"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Video01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { getProject } from "@/features/projects/storage/project-db";
import type { ProjectRecord } from "@/features/projects/storage/project-db";

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getProject(id).then((p) => {
      if (p) {
        setProject(p);
      } else {
        setNotFound(true);
      }
    });
  }, [id]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-muted-foreground">Project not found</p>
        <Button variant="outline" size="sm" onClick={() => router.push("/projects")}>
          Back to projects
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-12 items-center gap-3 border-b border-sidebar-border px-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.push("/projects")}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
        </Button>
        <span className="text-sm font-medium">
          {project?.name ?? "Loading..."}
        </span>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10">
            <HugeiconsIcon icon={Video01Icon} size={36} className="text-amber-500" />
          </div>
          <h2 className="text-lg font-semibold">Editor coming soon</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            The video editor will be built here. Project ID:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              {id}
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
