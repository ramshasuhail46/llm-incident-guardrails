"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check, X, Shield, Zap, Users, AlertCircle, Database, Lock } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 lg:px-8">
                <div className="container mx-auto text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] mb-6">
                        Transparent Pricing for <span className="text-primary">Modern Reliability</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Start free, scale with confidence. Choose the plan that fits your team's innovative workflow.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24 px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                        {/* Tier 1: Free */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Developer</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-gray-900">$0</span>
                                    <span className="ml-1 text-gray-500">/month</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">For individual developers exploring AI reliability.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Basic AI Incident Diagnosis",
                                    "Up to 5 Projects",
                                    "24h Incident Retention",
                                    "Community Support",
                                    "1 User Seat"
                                ].map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/sign-up" className="w-full block text-center py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-lg border border-gray-200 transition-colors">
                                Get Started Free
                            </Link>
                        </div>

                        {/* Tier 2: Pro (Recommended) */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-primary shadow-lg relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 md:-mt-4 md:mr-6">
                                <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Popular
                                </span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Pro Team</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-gray-900">$49</span>
                                    <span className="ml-1 text-gray-500">/month</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">For high-velocity teams automating response.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Advanced SRE Guardrails",
                                    "Unlimited Projects",
                                    "30-Day Incident Retention",
                                    "Team Collaboration Tools",
                                    "Prioritized Email Support",
                                    "Custom Webhooks",
                                    "Up to 10 User Seats"
                                ].map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/sign-up" className="w-full block text-center py-2.5 px-4 bg-primary hover:bg-opacity-90 text-white font-semibold rounded-lg shadow-md transition-all">
                                Start Pro Trial
                            </Link>
                        </div>

                        {/* Tier 3: Enterprise */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">For large organizations requiring total control.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "SSO & Advanced Security",
                                    "Full Audit Logs",
                                    "Dedicated Seoul DB Instance",
                                    "Unlimited Retention",
                                    "Dedicated Support Manager",
                                    "Service Level Agreements (SLA)",
                                    "Custom AI Models"
                                ].map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="mailto:sales@incidentflow.com" className="w-full block text-center py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
                                Contact Sales
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Compare Features</h2>
                        <p className="mt-4 text-gray-600">Detailed breakdown of what's included in each plan.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b-2 border-gray-100 min-w-[200px]"></th>
                                    <th className="p-4 border-b-2 border-gray-100 font-bold text-gray-900 text-lg min-w-[200px]">Developer</th>
                                    <th className="p-4 border-b-2 border-gray-100 font-bold text-primary text-lg min-w-[200px]">Pro Team</th>
                                    <th className="p-4 border-b-2 border-gray-100 font-bold text-gray-900 text-lg min-w-[200px]">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {/* Core Features */}
                                <tr><td colSpan={4} className="p-4 bg-gray-50 font-semibold text-gray-700 text-sm uppercase tracking-wider">Core Features</td></tr>
                                <tr>
                                    <td className="p-4 text-gray-600">AI Incident Diagnosis</td>
                                    <td className="p-4"><Check className="text-gray-400 h-5 w-5" /></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">SRE Guardrails</td>
                                    <td className="p-4"><X className="text-gray-300 h-5 w-5" /></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">Playbook Automation</td>
                                    <td className="p-4"><span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">Limited</span></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                </tr>

                                {/* Limits & specs */}
                                <tr><td colSpan={4} className="p-4 bg-gray-50 font-semibold text-gray-700 text-sm uppercase tracking-wider">Usage & Limits</td></tr>
                                <tr>
                                    <td className="p-4 text-gray-600">Projects</td>
                                    <td className="p-4 text-gray-900 font-medium">5</td>
                                    <td className="p-4 text-gray-900 font-medium">Unlimited</td>
                                    <td className="p-4 text-gray-900 font-medium">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">Data Retention</td>
                                    <td className="p-4 text-gray-900 font-medium">24 Hours</td>
                                    <td className="p-4 text-gray-900 font-medium">30 Days</td>
                                    <td className="p-4 text-gray-900 font-medium">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">API Rate Limits</td>
                                    <td className="p-4 text-gray-900 font-medium">100/min</td>
                                    <td className="p-4 text-gray-900 font-medium">1,000/min</td>
                                    <td className="p-4 text-gray-900 font-medium">Custom</td>
                                </tr>

                                {/* Advanced */}
                                <tr><td colSpan={4} className="p-4 bg-gray-50 font-semibold text-gray-700 text-sm uppercase tracking-wider">Security & AI</td></tr>
                                <tr>
                                    <td className="p-4 text-gray-600">AI Model Access</td>
                                    <td className="p-4 text-gray-900 font-medium">GPT-3.5</td>
                                    <td className="p-4 text-gray-900 font-medium">GPT-4o</td>
                                    <td className="p-4 text-gray-900 font-medium">Custom / Fine-tuned</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">Instance Location</td>
                                    <td className="p-4 text-gray-900 font-medium">US East</td>
                                    <td className="p-4 text-gray-900 font-medium">Global CDN</td>
                                    <td className="p-4 text-gray-900 font-medium">Seoul / Private VPC</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-600">Audit Logs</td>
                                    <td className="p-4"><X className="text-gray-300 h-5 w-5" /></td>
                                    <td className="p-4"><span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">Basic</span></td>
                                    <td className="p-4"><Check className="text-primary h-5 w-5" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Public Beta Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white py-3 border-t border-white/10 z-40">
                <div className="container mx-auto px-6 flex items-center justify-center gap-3">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">
                        IncidentFlow is currently in <span className="text-primary font-bold">Public Beta</span>. All features (including Pro & Enterprise) are <span className="underline">free to use</span> during the evaluation period.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
