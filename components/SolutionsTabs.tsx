'use client';

import { useState } from 'react';
import { Heart, Shield, Car, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryVisual from './CategoryVisual';

const tabs = [
    { id: 'health', label: 'Health Insurance', icon: Heart },
    { id: 'life', label: 'Life Insurance', icon: Shield },
    { id: 'motor', label: 'Motor Insurance', icon: Car },
];

const content = {
    health: [
        { title: 'Family Floater Plans', desc: 'Comprehensive coverage for 2 adults and up to 3 children.', price: 'Starts ₹8,000/yr' },
        { title: 'Senior Citizen Care', desc: 'Specialized plans covering age-related ailments with minimal waiting.', price: 'Starts ₹15,000/yr' },
        { title: 'Critical Illness', desc: 'Lump sum benefit for cancer, heart, and kidney related issues.', price: 'Starts ₹5,000/yr' },
    ],
    life: [
        { title: 'Term Life Insurance', desc: 'Pure protection plans with high sum assured at low premiums.', price: 'Starts ₹10,000/yr' },
        { title: 'Endowment Plans', desc: 'Guaranteed returns with insurance cover for disciplined savings.', price: 'Customized' },
        { title: 'Child Education', desc: 'Secure your child’s future milestones even in your absence.', price: 'Customized' },
    ],
    motor: [
        { title: 'Comprehensive Car', desc: 'Own damage + Third party liability cover with cashless claims.', price: 'Based on IDV' },
        { title: 'Two Wheeler', desc: 'Multi-year policies to save you from annual renewal hassles.', price: 'Starts ₹1,000/yr' },
        { title: 'Valid Commercial', desc: 'Coverage for taxis and commercial vehicles.', price: 'Customized' },
    ],
};

export default function SolutionsTabs() {
    type TabId = 'health' | 'life' | 'motor';
    const [activeTab, setActiveTab] = useState<TabId>('health');

    return (
        <section id="solutions" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern & Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Technical Grid - Static */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Breathing Orbs - Dynamic */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-100 blur-[80px] mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-100 blur-[80px] mix-blend-multiply"
                />

                {/* Strategic Ring - Rotating */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-slate-200 rounded-full opacity-40"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-100 rounded-full opacity-30" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Tailored Solutions</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We analyze your risks and goals to recommend protection that actually fits your life stage, not just what's trending.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabId)}
                                    className={cn(
                                        "relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                                        isActive ? "text-white" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon size={18} />
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-slate-200"
                        >
                            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                {content[activeTab].map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.15 }}
                                        className="group relative flex flex-col p-8 md:p-10 hover:bg-slate-50 transition-colors duration-500 min-h-[480px]"
                                    >
                                        {/* Tag / Eyebrow */}
                                        <div className="mb-8 flex items-center gap-3">
                                            <span className="h-px w-6 bg-blue-600"></span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{activeTab} Solution</span>
                                        </div>

                                        {/* Visual */}
                                        <div className="h-40 w-full mb-8 relative overflow-hidden bg-slate-50/50">
                                            <CategoryVisual
                                                type={activeTab}
                                                className="h-full w-full absolute inset-0 rounded-none opacity-80 group-hover:scale-105 transition-transform duration-1000"
                                                animate={true}
                                            />
                                            {/* Subtle overlay to keep contrast high if needed */}
                                            <div className="absolute inset-0 bg-white/10" />
                                        </div>

                                        {/* Typography */}
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors pr-4">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed mb-8 font-light line-clamp-3 text-sm">
                                            {item.desc}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Premium Estimate</p>
                                                <p className="text-sm font-semibold text-slate-900">{item.price}</p>
                                            </div>
                                            <Link
                                                href={`/contact?service=${encodeURIComponent(item.title)}`}
                                                className="inline-flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider group-hover:text-blue-700 transition-colors"
                                            >
                                                Explore <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
