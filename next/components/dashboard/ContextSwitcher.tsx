'use client';

import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    Check,
    ChevronsUpDown,
    Plus,
    Building2,
    LayoutGrid,
    Settings,
    Building
} from 'lucide-react';
import { useWorkspace, Organization, Project } from '@/hooks/useWorkspace';
import { useRouter, usePathname } from 'next/navigation';

export default function ContextSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const { activeOrg, activeProject, setWorkspace, setOrganizations, organizations, setIsSyncing, isDemo } = useWorkspace();
    const [isOpen, setIsOpen] = React.useState(false);

    // Initialize state if not set
    React.useEffect(() => {
        async function fetchWorkspace() {
            try {
                const res = await fetch(`/api/dashboard/workspace${isDemo ? '?demo=true' : ''}`);
                const data = await res.json();
                setOrganizations(data);

                // If nothing is active, auto-select the first one
                if (!activeOrg && data.length > 0) {
                    setWorkspace(data[0], null);
                }
            } catch (err) {
                console.error("Failed to fetch workspace:", err);
            }
        }
        fetchWorkspace();
    }, [setOrganizations, setWorkspace, activeOrg, isDemo]);

    const handleProjectSelect = (org: Organization, project: Project | null) => {
        setIsSyncing(true);
        setWorkspace(org, project);

        if (project) {
            router.push(`/org/${org.slug}/proj/${project.id}${isDemo ? '?demo=true' : ''}`);
        } else {
            router.push(`/org/${org.slug}/dashboard${isDemo ? '?demo=true' : ''}`);
        }

        setIsOpen(false);
        // Reset syncing state after a short delay to simulate data fetching
        setTimeout(() => setIsSyncing(false), 800);
    };

    if (!activeOrg) return null;

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
                <button
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    aria-label="Switch Context"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-200">
                            <Building2 size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{activeOrg.name}</p>
                            <p className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
                                {activeProject ? activeProject.name : 'All Projects'}
                            </p>
                        </div>
                    </div>
                    <ChevronsUpDown size={16} className={`text-gray-400 group-hover:text-primary transition-colors duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="z-50 min-w-[240px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in fade-in zoom-in duration-200"
                    sideOffset={8}
                    align="start"
                >
                    <DropdownMenu.Label className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Organizations & Projects
                    </DropdownMenu.Label>

                    {organizations.map((org) => (
                        <div key={org.id} className="mt-1">
                            <div className="px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50/50 rounded-lg mb-1">
                                <Building size={12} />
                                {org.name}
                            </div>

                            {/* All Projects Option for this Org */}
                            <DropdownMenu.Item
                                onSelect={() => handleProjectSelect(org, null)}
                                className={`
                                    flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-all duration-150 mb-1
                                    ${!activeProject && activeOrg.id === org.id
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutGrid size={14} className={!activeProject && activeOrg.id === org.id ? 'text-primary' : 'text-gray-400'} />
                                    All Projects
                                </div>
                                {!activeProject && activeOrg.id === org.id && (
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                )}
                            </DropdownMenu.Item>

                            {org.projects.map((project) => (
                                <DropdownMenu.Item
                                    key={project.id}
                                    onSelect={() => handleProjectSelect(org, project)}
                                    className={`
                                        flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-all duration-150
                                        ${activeProject?.id === project.id
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                                        {project.name}
                                    </div>
                                    {activeProject?.id === project.id && (
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                            <Check size={12} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </DropdownMenu.Item>
                            ))}
                        </div>
                    ))}

                    {!isDemo && (
                        <>
                            <DropdownMenu.Separator className="h-px bg-gray-100 my-2 mx-1" />

                            <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer outline-none transition-colors">
                                <Plus size={14} className="text-gray-400" />
                                <span>Create New Project</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                                onSelect={() => router.push(`/org/${activeOrg.slug}/settings`)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer outline-none transition-colors"
                            >
                                <Settings size={14} className="text-gray-400" />
                                <span>Organization Settings</span>
                            </DropdownMenu.Item>
                        </>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
