export default function IncidentList() {
    const incidents = [
        { id: 1, title: 'API Gateway Timeout', status: 'critical', time: '10 mins ago', color: 'bg-red-500' },
        { id: 2, title: 'Database latency increase', status: 'warning', time: '25 mins ago', color: 'bg-yellow-500' },
        { id: 3, title: 'Auth service healthy', status: 'resolved', time: '1 hour ago', color: 'bg-green-500' },
        { id: 4, title: 'S3 bucket access error', status: 'critical', time: '2 hours ago', color: 'bg-red-500' },
        { id: 5, title: 'Frontend build failure', status: 'warning', time: '3 hours ago', color: 'bg-yellow-500' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent Incidents</h3>
                <div className="flex gap-2">
                    <button className="text-xs font-bold bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200">All Status</button>
                    <button className="text-xs font-bold text-gray-400 px-3 py-1.5 hover:text-gray-600 transition-colors">Critical</button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1">
                {incidents.map((incident) => (
                    <div key={incident.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${incident.color} shadow-sm`}></div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{incident.title}</h4>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Last {incident.time}</p>
                            </div>
                        </div>

                        <button className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-gray-600 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <button className="p-4 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-gray-50">
                View all incidents
            </button>
        </div>
    );
}
