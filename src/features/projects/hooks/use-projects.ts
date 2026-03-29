"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../storage/project-db";
import type { ProjectRecord } from "../storage/project-db";
import {
  getAllGroups,
  createGroup,
  deleteGroup,
  renameGroup,
} from "../storage/group-db";
import type { GroupRecord } from "../storage/group-db";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [groups, setGroups] = useState<GroupRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [p, g] = await Promise.all([getAllProjects(), getAllGroups()]);
    setProjects(p);
    setGroups(g);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addProject = useCallback(
    async (name: string, groupId: string) => {
      const project = await createProject(name, groupId);
      await refresh();
      return project;
    },
    [refresh],
  );

  const removeProject = useCallback(
    async (id: string) => {
      await deleteProject(id);
      await refresh();
    },
    [refresh],
  );

  const editProject = useCallback(
    async (
      id: string,
      data: Partial<Pick<ProjectRecord, "name" | "groupId" | "thumbnail" | "duration">>,
    ) => {
      await updateProject(id, data);
      await refresh();
    },
    [refresh],
  );

  const addGroup = useCallback(
    async (name: string) => {
      const group = await createGroup(name);
      await refresh();
      return group;
    },
    [refresh],
  );

  const removeGroup = useCallback(
    async (id: string) => {
      await deleteGroup(id);
      await refresh();
    },
    [refresh],
  );

  const editGroup = useCallback(
    async (id: string, name: string) => {
      await renameGroup(id, name);
      await refresh();
    },
    [refresh],
  );

  const recentProjects = projects.slice(0, 5);

  return {
    projects,
    groups,
    recentProjects,
    isLoading,
    addProject,
    removeProject,
    editProject,
    addGroup,
    removeGroup,
    editGroup,
  };
}
