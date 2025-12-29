"use client";

import { useWorkspace } from "@/hooks/useWorkspace";
import { Info, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DemoBanner() {
    const { isDemo } = useWorkspace();
    const [isVisible, setIsVisible] = useState(true);

    if (!isDemo || !isVisible) return null;

    return (
        <div className="bg-primary px-4 py-2 text-white relative">
            <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>You are viewing the <strong>Live Sandbox</strong>. Data resets every hour.</span>
                </div>
                <Link
                    href="/sign-up"
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors border border-white/20"
                >
                    Sign up to Create Your Own
                </Link>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
