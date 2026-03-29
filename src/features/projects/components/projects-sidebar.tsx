"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Clock01Icon,
  FolderLibraryIcon,
  Logout03Icon,
  PlusSignIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { siteConfig } from "@klipeo/shared";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/features/auth/client";
import { BrandLogo } from "@/features/marketing/components/brand-logo";
import type { ProjectRecord } from "../storage/project-db";
import type { GroupRecord } from "../storage/group-db";

interface ProjectsSidebarProps {
  projects: ProjectRecord[];
  groups: GroupRecord[];
  recentProjects: ProjectRecord[];
  onNewProject: (groupId: string) => void;
  onNewGroup: () => void;
}

export function ProjectsSidebar({
  projects,
  groups,
  recentProjects,
  onNewProject,
  onNewGroup,
}: ProjectsSidebarProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (hasAnimated.current || !contentRef.current) return;
    hasAnimated.current = true;

    const items = contentRef.current.querySelectorAll("[data-sidebar='menu-item']");
    gsap.fromTo(
      items,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 },
    );
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="h-12 justify-center border-b border-sidebar-border p-0 px-4">
        <div className="flex items-center gap-2">
          <BrandLogo size="sm" />
          <span className="text-sm font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
        </div>
      </SidebarHeader>

      <div className="p-3">
        <Button
          className="w-full justify-start gap-2 bg-amber-500 text-black hover:bg-amber-400"
          size="sm"
          onClick={() => onNewProject("default")}
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          New Project
        </Button>
      </div>

      <SidebarContent ref={contentRef}>
        {recentProjects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>
              <HugeiconsIcon icon={Clock01Icon} size={14} className="mr-1.5" />
              Recents
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      onClick={() => router.push(`/editor/${project.id}`)}
                    >
                      <HugeiconsIcon icon={Video01Icon} size={16} />
                      <span>{project.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>
            <HugeiconsIcon icon={FolderLibraryIcon} size={14} className="mr-1.5" />
            Groups
          </SidebarGroupLabel>
          <SidebarGroupAction onClick={onNewGroup} title="New group">
            <HugeiconsIcon icon={PlusSignIcon} size={14} />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {groups.map((group) => {
                const count = projects.filter((p) => p.groupId === group.id).length;
                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuButton>
                      <HugeiconsIcon icon={FolderLibraryIcon} size={16} />
                      <span>{group.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {count}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {session && (
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-8 w-8">
              {session.user.image && (
                <AvatarImage src={session.user.image} alt={session.user.name} />
              )}
              <AvatarFallback className="text-xs">
                {session.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => window.location.assign("/"),
                  },
                })
              }
              className="text-muted-foreground hover:text-destructive"
            >
              <HugeiconsIcon icon={Logout03Icon} size={18} />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
