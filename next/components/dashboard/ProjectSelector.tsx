'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutGrid,
    Check,
    ChevronsUpDown,
    Plus
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWorkspace, Organization, Project } from '@/hooks/useWorkspace';
import { useOrganization } from '@clerk/nextjs';
import { useTenant } from '@/contexts/TenantContext';

export default function ProjectSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();
    const {
        activeOrg,
        activeProject,
        setWorkspace,
        organizations,
        fetchWorkspaceData,
        setIsSyncing
    } = useWorkspace();
    const { currentTenantId, isLoading: isTenantLoading } = useTenant();
    const [isOpen, setIsOpen] = React.useState(false);

    // Sync Workspace with Tenant Context
    React.useEffect(() => {
        async function syncWorkspace() {
            await fetchWorkspaceData();

            if (!currentTenantId) return;

            const currentOrgs = useWorkspace.getState().organizations;

            if (organization) {
                // User selected a specific organization
                const matchingOrg = currentOrgs.find((o: Organization) => o.clerkId === organization.id || o.slug === organization.slug);
                if (matchingOrg && activeOrg?.id !== matchingOrg.id) {
                    setWorkspace(matchingOrg, null);
                }
            } else if (currentTenantId) {
                // Fallback: If Clerk object isn't ready but we have a tenant ID (from context)
                // Find matching org by ID directly
                const matchingOrg = currentOrgs.find((o: Organization) => o.id === currentTenantId);
                if (matchingOrg && activeOrg?.id !== matchingOrg.id) {
                    setWorkspace(matchingOrg, null);
                }
            }
        }

        syncWorkspace();
    }, [organization?.id, currentTenantId, fetchWorkspaceData]);

    const handleProjectSelect = (project: Project | null) => {
        if (!activeOrg) return;

        setIsSyncing(true);
        setWorkspace(activeOrg, project);

        if (project) {
            router.push(`/org/${activeOrg.slug}/proj/${project.id}`);
        } else {
            router.push(`/org/${activeOrg.slug}/dashboard`);
        }

        setIsOpen(false);
        setTimeout(() => setIsSyncing(false), 500);
    };

    if (!activeOrg) return null;

    return (
        <div className="space-y-2">
            <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Project Selection
            </p>

            <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu.Trigger asChild>
                    <button
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                                {activeProject ? <div className="w-2 h-2 rounded-full bg-primary" /> : <LayoutGrid size={16} />}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-900 truncate max-w-[140px]">
                                    {activeProject ? activeProject.name : 'All Projects'}
                                </p>
                            </div>
                        </div>
                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-[100] min-w-[220px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in fade-in zoom-in duration-200"
                        sideOffset={8}
                        align="start"
                    >
                        <DropdownMenu.Item
                            onSelect={() => handleProjectSelect(null)}
                            className={`
                                flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-all duration-150 mb-1
                                ${!activeProject
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <LayoutGrid size={14} className={!activeProject ? 'text-primary' : 'text-gray-400'} />
                                All Projects
                            </div>
                            {!activeProject && <Check size={12} className="text-primary" strokeWidth={3} />}
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator className="h-px bg-gray-100 my-1 mx-1" />

                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                            {activeOrg.projects.map((project) => (
                                <DropdownMenu.Item
                                    key={project.id}
                                    onSelect={() => handleProjectSelect(project)}
                                    className={`
                                        flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-all duration-150 mb-1
                                        ${activeProject?.id === project.id
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${activeProject?.id === project.id ? 'bg-primary' : 'bg-gray-300'}`} />
                                        {project.name}
                                    </div>
                                    {activeProject?.id === project.id && <Check size={12} className="text-primary" strokeWidth={3} />}
                                </DropdownMenu.Item>
                            ))}
                        </div>

                        {activeOrg.projects.length === 0 && (
                            <div className="px-3 py-4 text-center">
                                <p className="text-xs text-gray-400 italic">No projects found</p>
                            </div>
                        )}

                        <DropdownMenu.Separator className="h-px bg-gray-100 my-1 mx-1" />

                        <DropdownMenu.Item
                            onSelect={() => router.push('/dashboard/create-project')}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer outline-none transition-colors"
                        >
                            <Plus size={14} className="text-gray-400" />
                            <span>New Project</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}
