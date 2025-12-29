'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, useOrganization } from '@clerk/nextjs';

interface TenantContextType {
    currentTenantId: string | null;
    isLoading: boolean;
}

const TenantContext = createContext<TenantContextType>({
    currentTenantId: null,
    isLoading: true,
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const { userId } = useAuth();
    const { organization } = useOrganization();
    const [currentTenantId, setCurrentTenantId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadTenantId() {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                // If user is in an organization context, use that
                if (organization?.id) {
                    const response = await fetch(`/api/tenant/resolve?clerkOrgId=${organization.id}`);
                    if (!response.ok) {
                        console.error('Failed to resolve organization');
                        setIsLoading(false);
                        return;
                    }
                    const data = await response.json();
                    setCurrentTenantId(data.organizationId);
                    setIsLoading(false);
                    return;
                }

                // Otherwise, use personal workspace
                const response = await fetch(`/api/tenant/personal?userId=${userId}`);

                if (!response.ok) {
                    // User doesn't exist in database - create them (webhook bypass)
                    console.log('User not found, initializing...');
                    const initResponse = await fetch('/api/user/initialize', {
                        method: 'POST',
                    });

                    if (initResponse.ok) {
                        const initData = await initResponse.json();
                        setCurrentTenantId(initData.organization.id);
                        console.log('User initialized successfully');
                    } else {
                        console.error('Failed to initialize user');
                    }
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();
                setCurrentTenantId(data.organizationId);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading tenant ID:', error);
                setIsLoading(false);
            }
        }

        loadTenantId();
    }, [userId, organization?.id]);

    return (
        <TenantContext.Provider
            value={{
                currentTenantId,
                isLoading,
            }}
        >
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    return useContext(TenantContext);
}
