import useSWR from 'swr';
import { useWorkspace } from './useWorkspace';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDashboardAnalytics() {
    const { activeProject } = useWorkspace();
    const projectId = activeProject?.id;
    const query = projectId ? `?projectId=${projectId}` : '';

    const { data: stats, isLoading: statsLoading } = useSWR(
        `/api/dashboard/stats${query}`,
        fetcher,
        { refreshInterval: 300000 } // 5 minutes
    );

    const { data: trends, isLoading: trendsLoading } = useSWR(
        `/api/dashboard/trends${query}`,
        fetcher,
        { refreshInterval: 300000 }
    );

    const { data: analysis, isLoading: analysisLoading } = useSWR(
        `/api/dashboard/analysis${query}`,
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
