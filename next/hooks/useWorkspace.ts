'use client';

import { create } from 'zustand';

export interface Project {
    id: string;
    name: string;
    slug: string;
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    projects: Project[];
}

interface WorkspaceState {
    activeOrg: Organization | null;
    activeProject: Project | null; // null means "All Projects"
    organizations: Organization[];
    isSyncing: boolean;
    setWorkspace: (org: Organization, project: Project | null) => void;
    setOrganizations: (orgs: Organization[]) => void;
    setIsSyncing: (isSyncing: boolean) => void;
}

export const useWorkspace = create<WorkspaceState>((set) => ({
    activeOrg: null,
    activeProject: null,
    organizations: [],
    isSyncing: false,
    setWorkspace: (org, project) => set({ activeOrg: org, activeProject: project }),
    setOrganizations: (orgs) => set({ organizations: orgs }),
    setIsSyncing: (isSyncing) => set({ isSyncing }),
}));
