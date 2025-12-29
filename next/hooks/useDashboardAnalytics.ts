import useSWR from 'swr';
import { useWorkspace } from './useWorkspace';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDashboardAnalytics() {
    const { activeProject, isDemo } = useWorkspace();
    const projectId = activeProject?.id;

    // Build query params
    const params = new URLSearchParams();
    if (projectId) params.append('projectId', projectId);
    if (isDemo) params.append('demo', 'true');

    const queryString = params.toString() ? `?${params.toString()}` : '';

    const { data: stats, isLoading: statsLoading } = useSWR(
        `/api/dashboard/stats${queryString}`,
        fetcher,
        { refreshInterval: 300000 } // 5 minutes
    );

    const { data: trends, isLoading: trendsLoading } = useSWR(
        `/api/dashboard/trends${queryString}`,
        fetcher,
        { refreshInterval: 300000 }
    );

    const { data: analysis, isLoading: analysisLoading } = useSWR(
        `/api/dashboard/analysis${queryString}`,
        fetcher,
        { refreshInterval: 300000 }
    );

    const isLoading = statsLoading || trendsLoading || analysisLoading;

    return {
        stats,
        trends,
        analysis,
        isLoading,
        activeProject
    };
}
