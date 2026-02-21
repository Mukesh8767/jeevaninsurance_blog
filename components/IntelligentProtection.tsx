'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, BarChart3, Fingerprint, Zap, Lock, Globe, Users } from 'lucide-react';

const coreValues = [
    {
        title: "Smart Risk Analysis",
        desc: "Advanced algorithms to assess your family's specific risk profile.",
        icon: Cpu,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Precision Matching",
        desc: "We match you with policies that offer the maximum claim-to-premium ratio.",
        icon: BarChart3,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "Biometric Data Security",
        desc: "Your personal details are encrypted and protected with bank-grade security.",
        icon: Fingerprint,
        color: "text-secondary",
        bg: "bg-secondary/10"
    },
    {
        title: "Instant Verification",
        desc: "Get real-time updates on policy approval and IRDAI compliance.",
        icon: ShieldCheck,
        color: "text-purple-600",
        bg: "bg-purple-50"
    }
];

export default function IntelligentProtection() {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent opacity-50" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                                Next-Gen Advisory
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold text-primary tracking-tighter leading-tight">
                                Intelligent Protection <br />
                                <span className="text-secondary">Measured by Precision.</span>
                            </h2>
                        </div>

                        <p className="text-slate-500 text-lg font-light leading-relaxed max-w-xl">
                            Gone are the days of generic insurance. JivanSecure leverages data-driven insights to curate protection portfolios that evolve with your life stages.
                        </p>

                        <div className="flex gap-12 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-primary">99.8%</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Claim Success</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">15k+</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Lives Secured</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">0</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Hidden Costs</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Feature Cards */}
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {coreValues.map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon size={24} />
                                    </div>
                                    <h4 className="text-lg font-bold text-primary mb-3">{val.title}</h4>
                                    <p className="text-slate-500 text-xs font-light leading-relaxed uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                        {val.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
