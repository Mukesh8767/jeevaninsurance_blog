'use client';

import { useState } from 'react';
import {
    Heart, Shield, Car, ArrowRight, ShieldCheck,
    ShieldAlert, FileText, Hospital, UserPlus,
    Users, Baby, Activity, Stethoscope, Timer,
    TrendingUp, Wallet, Sunset, GraduationCap,
    Banknote, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/lib/assets';

const tabs = [
    { id: 'health', label: 'Health', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'life', label: 'Life', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'motor', label: 'Motor', icon: Car, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const content: Record<string, any[]> = {
    health: [
        {
            title: 'Mediclaim',
            icon: Hospital,
            desc: 'Essential hospitalization cover for illnesses and sudden accidents.',
            features: ['Cashless Treatment', 'Tax Benefits', 'Pre/Post Hospitalization'],
            image: IMAGES.HEALTH.FAMILY
        },
        {
            title: 'Senior Citizen',
            icon: UserPlus,
            desc: 'Specialized care for age-related ailments with lower waiting periods.',
            features: ['No Medical Checkup', 'Ayush Coverage', 'Home Care'],
            image: IMAGES.HEALTH.SENIOR
        },
        {
            title: 'Family Plans',
            icon: Users,
            desc: 'Total protection for up to 6 members under a single shared limit.',
            features: ['Floater Benefit', 'Restore Sum Insured', 'Newborn Cover'],
            image: IMAGES.HEALTH.FAMILY
        },
        {
            title: 'Maternity Plans',
            icon: Baby,
            desc: 'Comprehensive pregnancy cover including delivery and newborn vaccination.',
            features: ['Childbirth Cover', 'Antenatal Costs', 'Complication Support'],
            image: IMAGES.HEALTH.FAMILY
        },
        {
            title: 'Critical Illness',
            icon: Activity,
            desc: 'Large fixed payout on diagnosis of major life-threatening diseases.',
            features: ['Cancer & Cardiac Cover', 'Income Benefit', '30+ Illnesses'],
            image: IMAGES.HEALTH.CRITICAL
        },
        {
            title: 'Personal Accident',
            icon: Stethoscope,
            desc: 'Financial security against accidental death or permanent disability.',
            features: ['Lump Sum Payout', 'Children Education', 'Employment Loss'],
            image: IMAGES.HEALTH.CRITICAL
        }
    ],
    life: [
        {
            title: 'Term Insurance',
            icon: Timer,
            desc: 'High life cover at minimal cost to ensure family financial stability.',
            features: ['High Sum Assured', 'Affordable Premiums', 'Rider Options'],
            image: IMAGES.LIFE.TERM
        },
        {
            title: 'ULIPs',
            icon: TrendingUp,
            desc: 'Market-linked returns combined with the secure safety of life cover.',
            features: ['Wealth Creation', 'Tax Exemption', 'Switch Option'],
            image: IMAGES.LIFE.ENDOWMENT
        },
        {
            title: 'Savings',
            icon: Wallet,
            desc: 'Guaranteed maturity benefits for achieving key life milestones safely.',
            features: ['Safe Returns', 'Insurance Shield', 'Disciplined Savings'],
            image: IMAGES.LIFE.ENDOWMENT
        },
        {
            title: 'Pension Plans',
            icon: Sunset,
            desc: 'Build a corpus to receive regular monthly income post-retirement.',
            features: ['Life Income', 'Inflation Hedge', 'Vesting Benefit'],
            image: IMAGES.LIFE.TERM
        },
        {
            title: 'Child Insurance',
            icon: GraduationCap,
            desc: 'Secure your child\'s higher education regardless of any life uncertainties.',
            features: ['Education Fund', 'Premium Waiver', 'Marriage Corpus'],
            image: IMAGES.LIFE.CHILD
        },
        {
            title: 'Money Back',
            icon: Banknote,
            desc: 'Periodic survival benefits during the policy term for liquidity.',
            features: ['Liquidity Benefit', 'Bonus Addition', 'Total Security'],
            image: IMAGES.LIFE.ENDOWMENT
        }
    ],
    motor: [
        {
            title: 'Third Party',
            icon: ShieldAlert,
            desc: 'Mandatory legal cover for injury or damage caused to others.',
            features: ['Legal Compliance', 'No Expiry Renewal', 'Personal Accident Cover'],
            image: IMAGES.MOTOR.CAR
        },
        {
            title: 'Comprehensive',
            icon: ShieldCheck,
            desc: 'Full protection against theft, fire, accidents, and natural disasters.',
            features: ['Zero Dep Add-on', 'Engine Protect', 'Asset Payout'],
            image: IMAGES.MOTOR.CAR
        },
        {
            title: 'Own Damage',
            icon: Car,
            desc: 'Standalone cover specifically for damages to your own vehicle.',
            features: ['Collision Cover', 'Fire & Theft', 'Flexible IDV'],
            image: IMAGES.MOTOR.CAR
        },
        {
            title: 'Learn More About Motor Insurance',
            icon: FileText,
            desc: 'Expert guide on Motor Insurance, claims, and choosing the right IDV.',
            features: ['Claims Guide', 'Glossary', 'Comparison Tips'],
            image: IMAGES.MOTOR.TWO_WHEELER
        }
    ]
};

export default function SolutionsTabs() {
    type TabId = 'health' | 'life' | 'motor';
    const [activeTab, setActiveTab] = useState<TabId>('health');

    return (
        <section id="solutions" className="py-12 lg:py-16 bg-[#FBFBFD] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-20">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px]"
                        >
                            Tailored For You
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-7xl font-bold text-primary tracking-tighter leading-none"
                        >
                            Intelligent <br />
                            <span className="text-secondary italic">Protection.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-base lg:text-lg font-light leading-relaxed max-w-md"
                    >
                        Every strategic recommendation is built on a foundation of trust and technical precision.
                    </motion.p>
                </div>

                {/* Modern Navigation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-12 lg:mb-16">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={cn(
                                    "group relative p-5 lg:p-8 rounded-3xl transition-all duration-500 text-left overflow-hidden border border-transparent",
                                    isActive
                                        ? "bg-white shadow-2xl shadow-primary/5 border-slate-100 scale-[1.02]"
                                        : "hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="tabBackground"
                                        className="absolute inset-0 bg-white"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <div className="relative z-10 flex items-center gap-4 lg:gap-6">
                                    <div className={cn(
                                        "w-10 h-10 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                        isActive ? "bg-primary text-white" : cn(tab.bg, tab.color, "group-hover:scale-110")
                                    )}>
                                        <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
                                    </div>
                                    <div>
                                        <h3 className={cn(
                                            "font-bold text-lg lg:text-xl tracking-tight transition-colors",
                                            isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                        )}>
                                            {tab.label}
                                        </h3>
                                        <div className={cn(
                                            "mt-1 h-1 w-8 rounded-full transition-all duration-500",
                                            isActive ? "bg-secondary w-12 lg:w-16" : "bg-transparent group-hover:bg-slate-200"
                                        )} />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Content Display */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
                        >
                            {content[activeTab].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.title}
                                        href={`/category/${activeTab}-insurance`}
                                        className="group relative bg-white p-4 lg:p-6 rounded-2xl lg:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
                                    >
                                        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-3 lg:mb-6">
                                            <Icon className="w-4 h-4 lg:w-6 lg:h-6" />
                                        </div>

                                        <h4 className="text-sm lg:text-lg font-bold text-primary mb-2 lg:mb-3 tracking-tight group-hover:text-secondary transition-colors line-clamp-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-500 font-light text-[10px] lg:text-xs leading-relaxed mb-3 lg:mb-6 flex-1 line-clamp-3">
                                            {item.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                                            {item.features.slice(0, 2).map((feat: string, i: number) => (
                                                <div key={i} className="flex items-center gap-1 text-[8px] lg:text-[9px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-slate-400 transition-colors">
                                                    <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 bg-secondary rounded-full" />
                                                    <span className="line-clamp-1">{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                            <ArrowRight size={14} className="text-secondary" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute -bottom-[10%] -left-20 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />
        </section>
    );
}
