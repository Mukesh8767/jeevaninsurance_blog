'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Eye, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/assets';

const tabs = [
    {
        id: 'history',
        label: 'Our History',
        icon: Shield,
        content: "With 15+ years of industry experience, we've built trust by helping thousands of clients choose the right coverage for their needs. Our journey started with a small vision — to simplify insurance — and has now grown into a trusted advisory service serving families and businesses across India."
    },
    {
        id: 'mission',
        label: 'Our Mission',
        icon: Target,
        content: "Our mission is to empower individuals and businesses with unbiased financial clarity. We aim to transform insurance from a complex obligation into a transparent promise of security through personalized guidance and technical excellence."
    },
    {
        id: 'vision',
        label: 'Our Vision',
        icon: Eye,
        content: "We envision a future where every Indian family is adequately protected against life's uncertainties. By combining traditional trust with modern technology, JivanSecure strives to be the gold standard in independent financial advisory."
    }
];

export default function AboutTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <section id="about" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl lg:text-5xl font-bold text-primary mb-4 lg:mb-6"
                            >
                                About <span className="text-secondary italic">Us</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed font-light"
                            >
                                We are certified <strong className="text-primary font-medium">Insurance Advisors</strong> with over <strong className="text-primary font-medium">15+ years of experience</strong> in helping individuals and businesses secure their future. Our role is to guide you with honest advice and the right protection plans — from life and health to motor and business insurance.
                            </motion.p>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex flex-wrap gap-2 border-b border-slate-100">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-4 py-3 lg:px-8 lg:py-4 text-xs lg:text-sm font-bold uppercase tracking-widest transition-all relative",
                                        activeTab === tab.id ? "text-secondary" : "text-slate-400 hover:text-primary"
                                    )}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="aboutUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[140px] lg:min-h-[160px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-slate-500 leading-relaxed font-light text-base lg:text-lg"
                                >
                                    {tabs.find(t => t.id === activeTab)?.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Visual Layers (Inspired by Image 1) */}
                    <div className="relative mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="aspect-square bg-secondary rounded-3xl relative overflow-hidden shadow-2xl"
                        >
                            <img
                                src={IMAGES.ABOUT.ADVICE}
                                alt="Insurance Advice"
                                className="w-full h-full object-cover opacity-80 transition-all duration-700"
                            />
                            {/* Paper Cutout Overlay Style */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
                                <div className="w-full h-full border-2 border-dashed border-white/30 rounded-2xl flex flex-col items-center justify-center text-white">
                                    <Shield size={48} strokeWidth={1} className="mb-4 opacity-50 lg:w-16 lg:h-16" />
                                    <p className="text-center font-medium px-4 opacity-70 text-sm lg:text-base">A promise of financial security for your loved ones.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Overlapping Small Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-48 lg:w-64 aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden group"
                        >
                            <img
                                src={IMAGES.ABOUT.TEAM}
                                alt="Our Team"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-all" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
