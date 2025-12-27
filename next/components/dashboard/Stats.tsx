export default function Stats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Active Incidents</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-gray-900">64</span>
                    <span className="text-xs font-bold text-red-500 mb-1.5 flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        12%
                    </span>
                </div>
                <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[64%] h-full bg-primary rounded-full"></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Incidents</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-gray-900">21</span>
                    <span className="text-xs font-bold text-green-500 mb-1.5 flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        5%
                    </span>
                </div>
                <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[21%] h-full bg-secondary rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
