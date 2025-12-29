'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Shield, History, Users } from 'lucide-react';

interface ChangelogEntry {
    version: string;
    date: string;
    changes: {
        type: 'feature' | 'improvement' | 'fix';
        description: string;
    }[];
}

const changelog: ChangelogEntry[] = [
    {
        version: 'v1.0.0',
        date: '2025-12-28',
        changes: [
            { type: 'feature', description: 'History Archive with paginated incident registry' },
            { type: 'feature', description: 'Detailed Incident Reports with reconstructed timeline' },
            { type: 'feature', description: 'Organization Admin with Team Members and Audit Log' },
            { type: 'feature', description: 'Project Settings with API key rotation' },
            { type: 'feature', description: 'Real-time incident dashboard with AI-powered diagnostics' },
            { type: 'improvement', description: 'Context-aware navigation for org and project views' },
        ]
    }
];

export default function ChangelogModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'feature': return <Sparkles size={14} className="text-blue-500" />;
            case 'improvement': return <Shield size={14} className="text-green-500" />;
            case 'fix': return <History size={14} className="text-orange-500" />;
            default: return null;
        }
    };

    const getLabel = (type: string) => {
        switch (type) {
            case 'feature': return 'New';
            case 'improvement': return 'Improved';
            case 'fix': return 'Fixed';
            default: return type;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">What's New</h2>
                        <p className="text-sm text-gray-500 mt-1">Recent updates and improvements</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                    {changelog.map((entry, idx) => (
                        <div key={idx} className={idx > 0 ? 'mt-8 pt-8 border-t border-gray-100' : ''}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-black">
                                    {entry.version}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    {new Date(entry.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <ul className="space-y-3">
                                {entry.changes.map((change, changeIdx) => (
                                    <li key={changeIdx} className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {getIcon(change.type)}
                                        </div>
                                        <div className="flex-1">
                                            <span className={`text-[10px] font-black uppercase tracking-widest mr-2 ${change.type === 'feature' ? 'text-blue-600' :
                                                change.type === 'improvement' ? 'text-green-600' :
                                                    'text-orange-600'
                                                }`}>
                                                {getLabel(change.type)}
                                            </span>
                                            <span className="text-sm text-gray-700">
                                                {change.description}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
