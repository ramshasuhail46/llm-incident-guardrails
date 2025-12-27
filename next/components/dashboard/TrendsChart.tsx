export default function TrendsChart() {
    const data = [
        { height: '40%' }, { height: '60%' }, { height: '45%' }, { height: '80%' },
        { height: '30%' }, { height: '50%' }, { height: '70%' }, { height: '40%' },
        { height: '90%' }, { height: '55%' }, { height: '75%' }, { height: '65%' },
        { height: '85%' }, { height: '40%' }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm glass relative overflow-hidden group">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Incident Trends</h3>
                    <p className="text-xs text-gray-500">Daily Incidents: Last 30 Days</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </button>
            </div>

            <div className="h-48 flex items-end gap-2 px-2">
                {data.map((item, i) => (
                    <div key={i} className="flex-1 group/bar relative">
                        <div
                            style={{ height: item.height }}
                            className="w-full bg-primary/20 group-hover/bar:bg-primary transition-all duration-300 rounded-t-sm"
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                            {item.height === '90%' ? '12 Incidents' : '4 Incidents'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid lines */}
            <div className="absolute inset-x-6 top-24 h-[1px] bg-gray-50 -z-10"></div>
            <div className="absolute inset-x-6 top-36 h-[1px] bg-gray-50 -z-10"></div>
            <div className="absolute inset-x-6 top-48 h-[1px] bg-gray-50 -z-10"></div>
        </div>
    );
}
