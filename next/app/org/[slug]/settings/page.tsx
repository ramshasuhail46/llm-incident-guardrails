'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Users, ClipboardList, Shield, UserPlus, Clock, Hash, CheckCircle, Info } from 'lucide-react';

export default function OrganizationAdmin() {
    const { slug } = useParams() as { slug: string };
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabParam = searchParams.get('tab') as 'members' | 'audit' | null;

    const [members, setMembers] = useState<any[]>([]);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'members' | 'audit'>(tabParam || 'members');

    // Synchronize state with URL param
    useEffect(() => {
        if (tabParam && tabParam !== activeTab) {
            setActiveTab(tabParam);
        }
    }, [tabParam, activeTab]);

    const handleTabChange = (tab: 'members' | 'audit') => {
        setActiveTab(tab);
        router.push(`/org/${slug}/settings?tab=${tab}`);
    };
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [membersRes, logsRes] = await Promise.all([
                    fetch(`/api/org/${slug}/members`),
                    fetch(`/api/org/${slug}/audit-logs`)
                ]);
                const membersData = await membersRes.json();
                const logsData = await logsRes.json();

                setMembers(Array.isArray(membersData) ? membersData : []);
                setAuditLogs(Array.isArray(logsData) ? logsData : []);
            } catch (err) {
                console.error("Failed to fetch organization data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    const formatAction = (action: string) => {
        return action.replace(/_/g, ' ');
    };

    const getActionColor = (action: string) => {
        if (action.includes('RESOLVE')) return 'text-green-600 bg-green-50 border-green-100';
        if (action.includes('DELETE')) return 'text-red-600 bg-red-50 border-red-100';
        if (action.includes('UPDATE')) return 'text-blue-600 bg-blue-50 border-blue-100';
        return 'text-gray-600 bg-gray-50 border-gray-100';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Admin</h1>
                        <p className="text-gray-500">Manage your team and monitor organization activity.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
                    <button
                        onClick={() => handleTabChange('members')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'members' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Users size={18} />
                        Team Members
                    </button>
                    <button
                        onClick={() => handleTabChange('audit')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <ClipboardList size={18} />
                        Audit Log
                    </button>
                </div>

                {activeTab === 'members' ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Members</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">
                                <UserPlus size={16} />
                                Invite Member
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {Array.isArray(members) && members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                        {member.email.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{member.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(member.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Global Activity Feed</h2>
                        </div>
                        <div className="overflow-y-auto max-h-[600px]">
                            {auditLogs.length === 0 ? (
                                <div className="p-12 text-center text-gray-400 italic">No activity recorded yet</div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {Array.isArray(auditLogs) && auditLogs.map((log) => (
                                        <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-2 rounded-lg shrink-0 border ${getActionColor(log.action)}`}>
                                                    <Clock size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">{formatAction(log.action)}</span>
                                                        <span className="text-[10px] text-gray-400 font-medium">{new Date(log.createdAt).toLocaleString()}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                                                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                        <span className="flex items-center gap-1">
                                                            <Users size={12} />
                                                            {log.user?.email || 'System'}
                                                        </span>
                                                        {log.project && (
                                                            <span className="flex items-center gap-1">
                                                                <Hash size={12} />
                                                                {log.project.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
