'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HelpRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard - the Help sidebar can be opened from there
        router.replace('../dashboard');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-gray-600">Redirecting to dashboard...</p>
                <p className="text-sm text-gray-400 mt-2">
                    Click the Help button in the sidebar to access support
                </p>
            </div>
        </div>
    );
}
