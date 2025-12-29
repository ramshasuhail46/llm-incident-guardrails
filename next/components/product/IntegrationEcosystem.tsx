"use client";
import { useState } from 'react';

export default function IntegrationEcosystem() {
    const [activeTab, setActiveTab] = useState('python');

    const codeSnippet = `import requests

# Report an incident signal to IncidentFlow
def report_signal(error_message):
    url = "https://api.incidentflow.ai/v1/incidents"
    payload = {
        "source": "backend-service-a",
        "severity": "critical",
        "message": error_message,
        "metadata": {
            "region": "us-east-1",
            "version": "v2.4.1"
        }
    }
    
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }

    requests.post(url, json=payload, headers=headers)

# Usage
try:
    process_payment()
except Exception as e:
    report_signal(str(e))
`;

    return (
        <section className="bg-[#0A0A0A] py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Ecosystem */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Fits into your <span className="text-primary">Stack</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Seamlessly integrates with the tools you already use. From monitoring to communication, IncidentFlow connects the dots.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 font-bold">Py</div>
                                <span className="text-white font-medium">Python</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white font-bold border border-white/20">JS</div>
                                <span className="text-white font-medium">Next.js / Node</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 bg-blue-400/20 rounded flex items-center justify-center text-blue-400 font-bold">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.922 13.922h5.156v5.156h-5.156v-5.156zm-8.594 0h5.156v5.156H5.328v-5.156zm0-8.594h5.156v5.156H5.328V5.328zm8.594 0h5.156v5.156h-5.156V5.328zM4.767 19.643h-2.45v-7.14h2.45v7.14zm0-9.155h-2.45V3.348h2.45v7.14zm16.916 9.155h-2.45v-7.14h2.45v7.14zm0-9.155h-2.45V3.348h2.45v7.14z" /></svg>
                                </div>
                                <span className="text-white font-medium">Docker</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-10 h-10 bg-[#4A154B]/50 rounded flex items-center justify-center text-white font-bold">#</div>
                                <span className="text-white font-medium">Slack</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Code Preview */}
                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-xl overflow-hidden bg-[#1E1E1E] border border-gray-800 shadow-2xl">
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-gray-800">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 text-xs text-gray-400 font-mono">monitor_incident.py</div>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                                    <code>
                                        <span className="text-purple-400">import</span> requests{'\n\n'}
                                        <span className="text-gray-500"># Report an incident signal to IncidentFlow</span>{'\n'}
                                        <span className="text-purple-400">def</span> <span className="text-blue-400">report_signal</span>(error_message):{'\n'}
                                        {'    '}url = <span className="text-green-400">"https://api.incidentflow.ai/v1/incidents"</span>{'\n'}
                                        {'    '}payload = {'{'}{'\n'}
                                        {'        '}<span className="text-green-400">"source"</span>: <span className="text-green-400">"backend-service-a"</span>,{'\n'}
                                        {'        '}<span className="text-green-400">"severity"</span>: <span className="text-green-400">"critical"</span>,{'\n'}
                                        {'        '}<span className="text-green-400">"message"</span>: error_message{'\n'}
                                        {'    '}{'}'}{'\n\n'}
                                        {'    '}requests.post(url, json=payload)
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
