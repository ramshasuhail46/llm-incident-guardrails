'use client';

import GuardrailsConfig from '@/components/dashboard/GuardrailsConfig';
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function GuardrailsPage() {
    // We can reuse the DashboardContent wrapper if it provides layout structure, 
    // OR we can create a simpler layout since GuardrailsConfig handles its own container.
    // DashboardContent seems to be the main dashboard view (charts etc).

    // If I want to keep the sidebar context, I should probably check if layout.tsx handles the sidebar. 
    // Usually 'next/app/org/[slug]/proj/[id]/layout.tsx' would have the Sidebar.

    return (
        <div className="min-h-screen bg-white">
            <GuardrailsConfig />
        </div>
    );
}
