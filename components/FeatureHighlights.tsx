'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Wallet, Users, ArrowRight } from 'lucide-react';

const features = [
    {
        title: "Multiple Top Partners",
        desc: "Access a wide ecosystem of India's leading insurance providers.",
        icon: Users,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "Fast Policy Support",
        desc: "Swift assistance from claim filing to settlement through our team.",
        icon: Zap,
        color: "bg-amber-50 text-amber-600"
    },
    {
        title: "Affordable Plans",
        desc: "We analyze multiple quotes to find high-coverage plans for your budget.",
        icon: Wallet,
        color: "bg-emerald-50 text-emerald-600"
    },
    {
        title: "Personalized Advice",
        desc: "No bots. Real human strategy tailored to your specific life stage.",
        icon: ShieldCheck,
        color: "bg-purple-50 text-purple-600"
    }
];

export default function FeatureHighlights() {
    return (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Minimal Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000155 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-2xl mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            Technical Excellence
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight leading-tight mb-6">
                            Expert Guidance. <br />
                            <span className="text-secondary">Uncompromising Security.</span>
                        </h2>
                        <p className="text-slate-500 text-base font-light leading-relaxed max-w-xl">
                            We bridge the gap between complex insurance structures and your peace of mind with IRDAI-certified expertise.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative bg-white p-6 lg:p-10 rounded-3xl border border-slate-100 hover:border-secondary/20 hover:shadow-[0_20px_40px_-12px_rgba(0,1,85,0.05)] transition-all duration-500 flex flex-col items-start"
                            >
                                <div className={`w-12 h-12 lg:w-14 lg:h-14 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>

                                <div className="space-y-3 relative z-10 flex-1">
                                    <h3 className="text-lg lg:text-xl font-bold text-primary tracking-tight group-hover:text-secondary transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs lg:text-sm font-light leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-slate-300 group-hover:text-secondary transition-all duration-300">
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Detail</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Refined Hover Accent Line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent transition-all duration-700 ease-[0.16, 1, 0.3, 1] group-hover:w-full" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
