import { Search, Bell, Settings, Plus } from 'lucide-react';

export default function DashboardNavbar() {
    return (
        <nav className="h-16 border-b border-gray-100 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">I</span>
                    </div>
                    <span className="font-bold text-gray-900">IncidentFlow</span>
                </div>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
                    <a href="#" className="text-primary border-b-2 border-primary py-5">Dashboard</a>
                    <a href="#" className="hover:text-gray-900 py-5 transition-colors">Incidents</a>
                    <a href="#" className="hover:text-gray-900 py-5 transition-colors">Analytics</a>
                    <a href="#" className="hover:text-gray-900 py-5 transition-colors">Settings</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search incidents..."
                        className="bg-transparent border-none outline-none text-xs text-gray-600 w-32 focus:w-48 transition-all"
                    />
                    <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">⌘K</span>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>

                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">
                    <Plus size={16} />
                    Report Incident
                </button>
            </div>
        </nav>
    );
}
