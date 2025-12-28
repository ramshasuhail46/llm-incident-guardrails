'use client';

import { useState, useEffect } from 'react';
import { X, Search, BookOpen, Key, BarChart3, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspace } from '@/hooks/useWorkspace';
import Toast, { ToastType } from './Toast';
import faqData from '@/data/faq.json';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

interface HelpSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const quickLinks = [
    {
        id: 'connect-app',
        title: 'Connecting Your First App',
        description: 'Get started with API integration',
        icon: Key,
        faqId: '1',
    },
    {
        id: 'ai-scores',
        title: 'Understanding AI Scores',
        description: 'Learn about confidence metrics',
        icon: BarChart3,
        faqId: '2',
    },
    {
        id: 'api-keys',
        title: 'Managing API Keys',
        description: 'Secure your integrations',
        icon: BookOpen,
        faqId: '3',
    },
];

export default function HelpSidebar({ isOpen, onClose }: HelpSidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(faqData as FAQ[]);
    const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
    const [category, setCategory] = useState('General');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
        message: '',
        type: 'info',
        visible: false,
    });

    const { activeOrg, activeProject } = useWorkspace();

    // Filter FAQs based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredFAQs(faqData as FAQ[]);
            setSelectedFAQ(null);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = (faqData as FAQ[]).filter(
            (faq) =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                faq.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                faq.category.toLowerCase().includes(query)
        );
        setFilteredFAQs(filtered);
    }, [searchQuery]);

    // Lock body scroll when sidebar is open
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

    const handleQuickLinkClick = (faqId: string) => {
        const faq = (faqData as FAQ[]).find((f) => f.id === faqId);
        if (faq) {
            setSelectedFAQ(faq);
            setSearchQuery('');
        }
    };

    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim() || message.trim().length < 10) {
            setToast({
                message: 'Please enter a message with at least 10 characters',
                type: 'error',
                visible: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/support/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    message,
                    organizationId: activeOrg?.id,
                    projectId: activeProject?.id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setToast({
                    message: 'Support request submitted successfully! We\'ll get back to you soon.',
                    type: 'success',
                    visible: true,
                });
                setMessage('');
                setCategory('General');
            } else {
                setToast({
                    message: data.error || 'Failed to submit request',
                    type: 'error',
                    visible: true,
                });
            }
        } catch (error) {
            setToast({
                message: 'Network error. Please try again.',
                type: 'error',
                visible: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                            style={{ zIndex: 99998 }}
                            onClick={onClose}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-white shadow-2xl flex flex-col"
                            style={{ zIndex: 99999 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                            Help & Support
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Find answers or contact our team
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>

                                {/* Search Bar */}
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search knowledge base..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Quick Links */}
                                {!searchQuery && !selectedFAQ && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            Quick Links
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {quickLinks.map((link) => (
                                                <button
                                                    key={link.id}
                                                    onClick={() => handleQuickLinkClick(link.faqId)}
                                                    className="flex items-start gap-4 p-4 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl hover:border-primary/30 hover:shadow-md transition-all group text-left"
                                                >
                                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                        <link.icon size={20} className="text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 mb-1">
                                                            {link.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {link.description}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Selected FAQ */}
                                {selectedFAQ && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                                {selectedFAQ.category}
                                            </span>
                                            <button
                                                onClick={() => setSelectedFAQ(null)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                                            {selectedFAQ.question}
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            {selectedFAQ.answer}
                                        </p>
                                    </motion.div>
                                )}

                                {/* FAQ Results */}
                                {searchQuery && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            Search Results ({filteredFAQs.length})
                                        </h3>
                                        {filteredFAQs.length > 0 ? (
                                            <div className="space-y-3">
                                                {filteredFAQs.map((faq) => (
                                                    <button
                                                        key={faq.id}
                                                        onClick={() => setSelectedFAQ(faq)}
                                                        className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all"
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="font-bold text-gray-900 flex-1">
                                                                {faq.question}
                                                            </h4>
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded ml-2">
                                                                {faq.category}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {faq.answer}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                                                <p className="text-sm text-gray-400 mt-2">
                                                    Try different keywords or contact support below
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Contact Support Form */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                        Contact Support
                                    </h3>
                                    <form onSubmit={handleSubmitFeedback} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            >
                                                <option value="General">General Question</option>
                                                <option value="Bug">Bug Report</option>
                                                <option value="Feature Request">Feature Request</option>
                                                <option value="Billing">Billing Issue</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Describe your issue or question..."
                                                rows={5}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">
                                                Minimum 10 characters
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Submit Request
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={() => setToast({ ...toast, visible: false })}
            />
        </>
    );
}
