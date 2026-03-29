"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectsSidebar } from "./projects-sidebar";
import { ProjectCard } from "./project-card";
import { useProjects } from "../hooks/use-projects";

export function ProjectsShell() {
  const router = useRouter();
  const {
    projects,
    groups,
    recentProjects,
    isLoading,
    addProject,
    removeProject,
    addGroup,
  } = useProjects();
  const [search, setSearch] = useState("");

  const handleNewProject = async (groupId: string) => {
    const project = await addProject("Untitled project", groupId);
    router.push(`/editor/${project.id}`);
  };

  const handleNewGroup = async () => {
    await addGroup("New Group");
  };

  const filtered = search
    ? projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    : projects;

  const grouped = groups.map((group) => ({
    ...group,
    projects: filtered.filter((p) => p.groupId === group.id),
  }));

  return (
    <SidebarProvider>
      <ProjectsSidebar
        projects={projects}
        groups={groups}
        recentProjects={recentProjects}
        onNewProject={handleNewProject}
        onNewGroup={handleNewGroup}
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b border-sidebar-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">All Projects</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-56 pl-9"
              />
            </div>
            <Button
              size="sm"
              className="gap-1.5 bg-amber-500 text-black hover:bg-amber-400"
              onClick={() => handleNewProject("default")}
            >
              <HugeiconsIcon icon={Add01Icon} size={14} />
              New project
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {isLoading ? (
            <ProjectsLoading />
          ) : projects.length === 0 ? (
            <EmptyState onNewProject={() => handleNewProject("default")} />
          ) : (
            <div className="space-y-10">
              {grouped
                .filter((g) => g.projects.length > 0)
                .map((group) => (
                  <section key={group.id}>
                    <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                      {group.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {group.projects.map((project, i) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={i}
                          onDelete={removeProject}
                        />
                      ))}
                    </div>
                  </section>
                ))}

              {filtered.length === 0 && search && (
                <p className="py-20 text-center text-sm text-muted-foreground">
                  No projects match &ldquo;{search}&rdquo;
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

function EmptyState({ onNewProject }: { onNewProject: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
        <HugeiconsIcon icon={Add01Icon} size={28} className="text-amber-500" />
      </div>
      <h2 className="mt-5 text-lg font-semibold">No projects yet</h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        Create your first project to start editing videos with Klipeo.
      </p>
      <Button
        className="mt-6 gap-2 bg-amber-500 text-black hover:bg-amber-400"
        onClick={onNewProject}
      >
        <HugeiconsIcon icon={Add01Icon} size={16} />
        Create project
      </Button>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div>
      <Skeleton className="mb-4 h-4 w-28" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-video rounded-lg" />
            <Skeleton className="mt-2.5 h-4 w-32" />
            <Skeleton className="mt-1 h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
