"use client";

import { Search, Bell, Settings, Plus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardNavbar() {
    const { user } = useUser();

    return (
        <nav className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-sm font-bold text-gray-900 md:hidden hover:text-primary transition-colors">
                    IncidentFlow
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search incidents..."
                        className="bg-transparent border-none outline-none text-xs text-gray-600 w-32 focus:w-48 transition-all"
                    />
                    <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">⌘K</span>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                            alt="User"
                        />
                    )}
                </div>

                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">
                    <Plus size={16} />
                    Report Incident
                </button>
            </div>
        </nav>
    );
}
