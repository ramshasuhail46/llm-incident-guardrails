import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import Stats from '@/components/dashboard/Stats';
import TrendsChart from '@/components/dashboard/TrendsChart';
import IncidentList from '@/components/dashboard/IncidentList';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] selection:bg-primary/20 selection:text-primary">
            <DashboardNavbar />

            <main className="container mx-auto px-6 py-8">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Active Incidents Overview</h1>
                    <p className="text-gray-500">Real-time monitoring of your infrastructure performance.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <Stats />
                        <TrendsChart />

                        {/* Additional empty placeholder for more dashboard content if needed */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-40 bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed flex items-center justify-center">
                                <p className="text-gray-400 text-sm italic">Service Health Widget</p>
                            </div>
                            <div className="h-40 bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed flex items-center justify-center">
                                <p className="text-gray-400 text-sm italic">Team Availability Widget</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-1 h-full lg:sticky lg:top-24">
                        <IncidentList />
                    </div>
                </div>
            </main>
        </div>
    );
}
