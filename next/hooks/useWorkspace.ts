'use client';

import { create } from 'zustand';

export interface Project {
    id: string;
    name: string;
    slug: string;
}

export interface Organization {
    id: string;
    clerkId: string | null;
    name: string;
    slug: string;
    projects: Project[];
}

interface WorkspaceState {
    activeOrg: Organization | null;
    activeProject: Project | null; // null means "All Projects"
    organizations: Organization[];
    isSyncing: boolean;
    isDemo: boolean;
    setWorkspace: (org: Organization, project: Project | null) => void;
    setOrganizations: (orgs: Organization[]) => void;
    setIsSyncing: (isSyncing: boolean) => void;
    setIsDemo: (isDemo: boolean) => void;
    fetchWorkspaceData: () => Promise<void>;
}

const getInitialIsDemo = () => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('demo') === 'true';
};

export const useWorkspace = create<WorkspaceState>((set, get) => ({
    activeOrg: null,
    activeProject: null,
    organizations: [],
    isSyncing: false,
    isDemo: getInitialIsDemo(),
    setWorkspace: (org, project) => set({ activeOrg: org, activeProject: project }),
    setOrganizations: (orgs) => set({ organizations: orgs }),
    setIsSyncing: (isSyncing) => set({ isSyncing }),
    setIsDemo: (isDemo) => set({ isDemo }),
    fetchWorkspaceData: async () => {
        try {
            const { isDemo: isDemoMode } = get();
            const res = await fetch(`/api/dashboard/workspace${isDemoMode ? '?demo=true' : ''}`);
            const data = await res.json();
            set({ organizations: data });

            // If we have an active org, update its reference in the store 
            // to include any newly fetched projects while preserving selection
            const { activeOrg, activeProject } = get();
            if (activeOrg) {
                const refreshedOrg = data.find((o: Organization) => o.id === activeOrg.id);
                if (refreshedOrg) {
                    const refreshedProject = activeProject
                        ? refreshedOrg.projects.find((p: Project) => p.id === activeProject.id) || null
                        : null;
                    set({ activeOrg: refreshedOrg, activeProject: refreshedProject });
                }
            }
        } catch (err) {
            console.error("Failed to fetch workspace:", err);
        }
    },
}));
