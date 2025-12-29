'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Book, Code, Shield, Terminal, Zap, Hash, Webhook, Activity, AlertTriangle } from 'lucide-react';

export default function DocumentationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Left Sidebar - Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto hidden md:block">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8 text-primary hover:opacity-80 transition-opacity">
                        <Book className="w-6 h-6" />
                        <span className="font-bold text-xl tracking-tight">IncidentFlow</span>
                    </Link>

                    <nav className="space-y-8">
                        <div>
                            <h5 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Getting Started</h5>
                            <ul className="space-y-2 text-sm font-medium">
                                <li>
                                    <Link href="#quick-start" className="block text-gray-700 hover:text-primary transition-colors">
                                        Quick Start
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#authentication" className="block text-gray-500 hover:text-primary transition-colors ml-3 border-l pl-3 border-gray-100 hover:border-primary">
                                        Authentication
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">API Reference</h5>
                            <ul className="space-y-2 text-sm font-medium">
                                <li>
                                    <Link href="#incident-schema" className="block text-gray-700 hover:text-primary transition-colors">
                                        Incident Schema
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#webhooks" className="block text-gray-700 hover:text-primary transition-colors">
                                        Webhooks
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Architecture</h5>
                            <ul className="space-y-2 text-sm font-medium">
                                <li>
                                    <Link href="#ai-reliability" className="block text-gray-700 hover:text-primary transition-colors">
                                        AI Reliability
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#troubleshooting" className="block text-gray-700 hover:text-primary transition-colors">
                                        Troubleshooting
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-5xl mx-auto w-full">
                <div className="p-4 border-b border-gray-200 bg-white md:hidden sticky top-0 z-10">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                        <Book className="w-6 h-6" />
                        <span className="font-bold text-xl">IncidentFlow Docs</span>
                    </Link>
                </div>

                <div className="px-8 py-12 lg:px-12 lg:py-16">
                    <div className="mb-8">

                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                            Developer Documentation
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl">
                            Integrate IncidentFlow into your application in minutes. Use our API to ingest signals and let our AI handle the rest.
                        </p>
                    </div>

                    <hr className="my-12 border-gray-200" />

                    {/* Quick Start Section */}
                    <section id="quick-start" className="scroll-mt-24 mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Quick Start</h2>
                        </div>
                        <p className="text-lg text-gray-600 mb-8">
                            Follow this 3-minute guide to send your first incident signal to IncidentFlow.
                        </p>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8" id="authentication">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-gray-500" />
                                    Authentication
                                </h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    Authenticate your requests by including your Project API Key in the <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-sm text-pink-600">Authorization</code> header.
                                </p>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-amber-800 font-medium">
                                        Retrieve your API Key from the <strong>Project Settings &gt; API Security</strong> section.
                                    </p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                                    Authorization: Bearer <span className="text-purple-400">YOUR_PROJECT_API_KEY</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Send an Incident</h3>
                            <p className="text-gray-600">
                                Send a POST request to <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-sm">/api/incidents</code> with your standard error logs or alerts.
                            </p>

                            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Python</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                    </div>
                                </div>
                                <div className="p-6 overflow-x-auto">
                                    <pre className="text-sm font-mono leading-relaxed text-gray-300">
                                        <span className="text-purple-400">import</span> requests<br />
                                        <span className="text-purple-400">import</span> json<br />
                                        <br />
                                        url = <span className="text-green-400">"https://api.incidentflow.com/api/incidents"</span><br />
                                        <br />
                                        headers = &#123;<br />
                                        &nbsp;&nbsp;<span className="text-green-400">"Authorization"</span>: <span className="text-green-400">"Bearer YOUR_API_KEY"</span>,<br />
                                        &nbsp;&nbsp;<span className="text-green-400">"Content-Type"</span>: <span className="text-green-400">"application/json"</span><br />
                                        &#125;<br />
                                        <br />
                                        payload = &#123;<br />
                                        &nbsp;&nbsp;<span className="text-green-400">"severity"</span>: <span className="text-green-400">"high"</span>,<br />
                                        &nbsp;&nbsp;<span className="text-green-400">"source"</span>: <span className="text-green-400">"payment-service"</span>,<br />
                                        &nbsp;&nbsp;<span className="text-green-400">"rawSignals"</span>: &#123;<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"error"</span>: <span className="text-green-400">"Transaction timeout"</span>,<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"latency_ms"</span>: 5400,<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"user_id"</span>: <span className="text-green-400">"usr_12345"</span><br />
                                        &nbsp;&nbsp;&#125;<br />
                                        &#125;<br />
                                        <br />
                                        response = requests.post(url, headers=headers, json=payload)<br />
                                        print(response.json())
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="my-12 border-gray-200" />

                    {/* API Reference Section */}
                    <section id="api-reference" className="scroll-mt-24 mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">API Reference</h2>
                        </div>

                        <div className="space-y-12">
                            <div id="incident-schema">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-gray-400" />
                                    Incident Schema
                                </h3>
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 font-semibold w-1/4">Field</th>
                                                <th className="px-6 py-3 font-semibold w-1/4">Type</th>
                                                <th className="px-6 py-3 font-semibold">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            <tr>
                                                <td className="px-6 py-4 font-mono text-purple-600">incidentId</td>
                                                <td className="px-6 py-4 text-gray-500">String (UUID)</td>
                                                <td className="px-6 py-4 text-gray-600">Unique identifier for the incident. Generated automatically if not provided.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-mono text-purple-600">severity</td>
                                                <td className="px-6 py-4 text-gray-500">Enum</td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    One of: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">critical</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">high</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">medium</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">low</code>.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-mono text-purple-600">rawSignals</td>
                                                <td className="px-6 py-4 text-gray-500">Object</td>
                                                <td className="px-6 py-4 text-gray-600">Flexible JSON object containing logs, metrics, or error details for AI analysis.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-mono text-purple-600">source</td>
                                                <td className="px-6 py-4 text-gray-500">String</td>
                                                <td className="px-6 py-4 text-gray-600">The service or component reporting the incident (e.g., "auth-service").</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div id="webhooks">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Webhook className="w-5 h-5 text-gray-400" />
                                    Webhooks
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Subscribe to real-time events to trigger downstream actions. Configuring webhooks in the Settings dashboard.
                                </p>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="min-w-[40px] h-[40px] rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">incident.resolved</h4>
                                            <p className="text-gray-600 mb-4">
                                                Triggered when an incident is marked as resolved by a user or an automated guardrail rule.
                                            </p>
                                            <div className="bg-gray-50 rounded p-4 font-mono text-xs text-gray-700">
                                                &#123; "event": "incident.resolved", "id": "inc_...", "resolvedAt": "2024-03-20T10:30:00Z" &#125;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="my-12 border-gray-200" />

                    {/* Architecture Section */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <Code className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Architecture & Best Practices</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div id="ai-reliability" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">AI Reliability</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our AI assigns a <strong>Confidence Score</strong> (0-100%) to every diagnosis.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                                        <span><strong>&gt;90%</strong>: Safe for automated remediation if enabled.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        <span><strong>70-89%</strong>: Recommended for human review.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                                        <span><strong>&lt;70%</strong>: Flagged as uncertain.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">SRE Guardrails</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Guardrails act as a safety net for automated actions. You can configure rate limits, authorized action types (e.g., "Safe Restart Only"), and manual approval thresholds in the settings.
                                </p>
                            </div>
                        </div>

                        <div id="troubleshooting">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-gray-400" />
                                Troubleshooting
                            </h3>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold w-1/6">Code</th>
                                            <th className="px-6 py-3 font-semibold w-1/4">Error</th>
                                            <th className="px-6 py-3 font-semibold">Solution</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-red-600">401</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">Unauthorized</td>
                                            <td className="px-6 py-4 text-gray-600">Check your API Key. Ensure the Authorization header is "Bearer &lt;KEY&gt;".</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-red-600">403</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">Forbidden</td>
                                            <td className="px-6 py-4 text-gray-600">The API Key does not have permission for this project.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-orange-600">429</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">Too Many Requests</td>
                                            <td className="px-6 py-4 text-gray-600">You have exceeded the rate limit (1000 req/min). Implement exponential backoff.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-red-600">500</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">Internal Error</td>
                                            <td className="px-6 py-4 text-gray-600">Something went wrong on our end. Please contact support.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Right Sidebar - TOC */}
            <aside className="w-64 border-l border-gray-200 h-screen sticky top-0 overflow-y-auto hidden xl:block p-6">
                <h5 className="mb-4 text-xs font-bold text-gray-900 uppercase tracking-widest">On this page</h5>
                <ul className="space-y-3 text-sm border-l-2 border-gray-100 pl-4">
                    <li>
                        <Link href="#quick-start" className="block text-gray-600 hover:text-primary transition-colors">
                            Quick Start
                        </Link>
                    </li>
                    <li>
                        <Link href="#authentication" className="block text-gray-500 hover:text-primary transition-colors pl-2">
                            Authentication
                        </Link>
                    </li>
                    <li>
                        <Link href="#api-reference" className="block text-gray-600 hover:text-primary transition-colors">
                            API Reference
                        </Link>
                    </li>
                    <li>
                        <Link href="#incident-schema" className="block text-gray-500 hover:text-primary transition-colors pl-2">
                            Incident Schema
                        </Link>
                    </li>
                    <li>
                        <Link href="#webhooks" className="block text-gray-500 hover:text-primary transition-colors pl-2">
                            Webhooks
                        </Link>
                    </li>
                    <li>
                        <Link href="#architecture" className="block text-gray-600 hover:text-primary transition-colors">
                            Architecture
                        </Link>
                    </li>
                    <li>
                        <Link href="#ai-reliability" className="block text-gray-500 hover:text-primary transition-colors pl-2">
                            AI Reliability
                        </Link>
                    </li>
                    <li>
                        <Link href="#troubleshooting" className="block text-gray-500 hover:text-primary transition-colors pl-2">
                            Troubleshooting
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
