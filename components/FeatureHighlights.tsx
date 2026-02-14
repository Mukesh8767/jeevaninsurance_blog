'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Wallet, Users } from 'lucide-react';

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
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-3 lg:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className={`w-8 h-8 lg:w-12 lg:h-12 ${feature.color} rounded-xl flex items-center justify-center mb-3 lg:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-4 h-4 lg:w-6 lg:h-6" />
                                </div>
                                <h3 className="text-sm lg:text-xl font-bold text-primary mb-1 lg:mb-3 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-[10px] lg:text-sm font-light leading-relaxed line-clamp-2 lg:line-clamp-none">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
