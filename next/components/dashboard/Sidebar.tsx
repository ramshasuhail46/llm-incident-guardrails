'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import {
    LayoutDashboard,
    AlertCircle,
    BarChart3,
    Settings,
    Shield,
    Users,
    History,
    HelpCircle
} from 'lucide-react';
import ChangelogModal from './ChangelogModal';
import HelpSidebar from './HelpSidebar';
import { useWorkspace } from '@/hooks/useWorkspace';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'SRE Guardrails', href: '/guardrails', icon: Shield },
];

const secondaryNavItems = [
    { name: 'Team', href: '/team?tab=members', icon: Users },
    { name: 'History', href: '/history', icon: History },
    { name: 'Settings', href: '/settings?tab=audit', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { activeOrg, activeProject } = useWorkspace();
    const [showChangelog, setShowChangelog] = useState(false);
    const [showHelpSidebar, setShowHelpSidebar] = useState(false);

    const currentPathWithSearch = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    const getHref = (href: string) => {
        if (!activeOrg) return '#';

        const [path, query] = href.split('?');
        const search = query ? `?${query}` : '';

        // Handle org-level settings/team (always org-scoped)
        if (path === '/settings') {
            return activeProject
                ? `/org/${activeOrg.slug}/proj/${activeProject.id}/settings${search}`
                : `/org/${activeOrg.slug}/settings${search}`;
        }
        if (path === '/team') return `/org/${activeOrg.slug}/settings${search}`;

        // Handle history (context-aware)
        if (path === '/history') {
            return activeProject
                ? `/org/${activeOrg.slug}/proj/${activeProject.id}/history${search}`
                : `/org/${activeOrg.slug}/history${search}`;
        }

        // Handle dashboard (the main landing page)
        if (path === '/dashboard') {
            return activeProject
                ? `/org/${activeOrg.slug}/proj/${activeProject.id}${search}`
                : `/org/${activeOrg.slug}/dashboard${search}`;
        }

        // Handle guardrails
        if (path === '/guardrails') {
            return activeProject
                ? `/org/${activeOrg.slug}/proj/${activeProject.id}/guardrails${search}`
                : '#'; // Only available for projects
        }

        // Default: append to base
        const base = activeProject
            ? `/org/${activeOrg.slug}/proj/${activeProject.id}`
            : `/org/${activeOrg.slug}`;

        return `${base}${path}${search}`;
    };

    return (
        <>
            <aside className="w-72 h-screen border-r border-gray-100 bg-white flex flex-col sticky top-0">
                {/* Organization Switcher Section */}
                <div className="p-4 mb-4">
                    <OrganizationSwitcher
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                organizationSwitcherTrigger: "w-full flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm",
                                organizationSwitcherTriggerIcon: "text-gray-400 group-hover:text-primary transition-colors",
                                organizationPreview: "flex items-center gap-3",
                                organizationPreviewAvatarBox: "w-10 h-10 rounded-lg",
                                organizationPreviewTextContainer: "text-left",
                                organizationPreviewMainIdentifier: "text-sm font-bold text-gray-900",
                                organizationPreviewSecondaryIdentifier: "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                            },
                        }}
                        hidePersonal={false}
                        afterCreateOrganizationUrl="/dashboard"
                        afterSelectOrganizationUrl="/dashboard"
                        afterSelectPersonalUrl="/dashboard"
                    />
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    {/* Home/Landing Page Link */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 mb-4 rounded-xl text-sm font-medium transition-all duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Back to Home
                    </Link>

                    <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const href = getHref(item.href);
                        const isActive = currentPathWithSearch === href || pathname === href;
                        const isGuardrails = item.href === '/guardrails';
                        const isDisabled = isGuardrails && !activeProject;

                        return (
                            <Link
                                key={item.href}
                                href={href}
                                onClick={(e) => {
                                    if (isDisabled) {
                                        e.preventDefault();
                                        alert('Please select a project to configure SRE Guardrails.');
                                    }
                                }}
                                className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Secondary Navigation */}
                <nav className="px-4 py-6 border-t border-gray-50 space-y-1">
                    <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        System
                    </p>
                    {secondaryNavItems.map((item) => {
                        const href = getHref(item.href);
                        const isActive = currentPathWithSearch === href;
                        return (
                            <Link
                                key={item.href}
                                href={href}
                                className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                            `}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Help Button */}
                    <button
                        onClick={() => setShowHelpSidebar(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    >
                        <HelpCircle size={20} className="text-gray-400" />
                        Help
                    </button>
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 border-t border-gray-50 space-y-3">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "w-full",
                                userButtonBox: "w-full",
                                userButtonTrigger: "w-full flex items-center gap-3 p-2 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all group",
                                userButtonAvatarBox: "w-10 h-10 rounded-full",
                                userButtonOuterIdentifier: "text-sm font-bold text-gray-900",
                                userButtonInnerIdentifier: "text-xs text-gray-500",
                            }
                        }}
                        showName={true}
                    />

                    {/* Version & Changelog */}
                    <div className="px-2 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Version 1.0.0
                        </span>
                        <button
                            onClick={() => setShowChangelog(true)}
                            className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                        >
                            What's New
                        </button>
                    </div>
                </div>

                {/* Changelog Modal */}
                <ChangelogModal isOpen={showChangelog} onClose={() => setShowChangelog(false)} />
            </aside>

            {/* Help Sidebar - Rendered outside to avoid stacking context issues */}
            <HelpSidebar isOpen={showHelpSidebar} onClose={() => setShowHelpSidebar(false)} />
        </>
    );
}
