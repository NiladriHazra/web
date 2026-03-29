"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  MoreHorizontalIcon,
  Calendar03Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { ProjectRecord } from "../storage/project-db";

interface ProjectCardProps {
  project: ProjectRecord;
  index: number;
  onDelete: (id: string) => void;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ProjectCard({ project, index, onDelete }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: index * 0.05,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group">
      <Link href={`/editor/${project.id}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/5 bg-neutral-900 transition-colors group-hover:border-amber-500/30">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <HugeiconsIcon
                icon={Video01Icon}
                size={32}
                className="text-neutral-700"
              />
            </div>
          )}

          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[0.65rem] font-medium tabular-nums text-white/80">
            {formatDuration(project.duration)}
          </span>

          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-7 w-7 bg-black/60 text-white hover:bg-black/80"
                  onClick={(e) => e.preventDefault()}
                >
                  <HugeiconsIcon icon={MoreHorizontalIcon} size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(project.id);
                  }}
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Link>

      <div className="mt-2.5 px-0.5">
        <p className="truncate text-sm font-medium">{project.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <HugeiconsIcon icon={Calendar03Icon} size={12} />
          Created {new Date(project.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
