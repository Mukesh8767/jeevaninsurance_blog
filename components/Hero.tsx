'use client';

import ContactForm from './ContactForm';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PremiumHeroVisual from './PremiumHeroVisual';
import CountUp from './CountUp';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white">
            <PremiumHeroVisual />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                Strategic Perspectives 2024
                            </div>
                            <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter text-slate-900 leading-[0.95]">
                                Protecting <br />
                                <span className="text-blue-600">What Matters Most.</span>
                            </h1>
                        </div>

                        <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed max-w-lg font-light">
                            Navigate the complexities of risk and wealth with India's most transparent financial architects.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <a
                                href="#solutions"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-slate-300"
                            >
                                Practice Areas
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#about"
                                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                Our Philosophy
                            </a>
                        </div>

                        {/* Impact Stats */}
                        <div className="pt-12 grid grid-cols-2 gap-12 border-t border-slate-100">
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900"><CountUp to={2500} /></span>
                                    <span className="text-blue-600 font-bold text-lg">+</span>
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Institutional Clients</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900"><CountUp to={98} /></span>
                                    <span className="text-blue-600 font-bold text-lg">%</span>
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Claims Efficiency</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-50 via-slate-50 to-white rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
                        <ContactForm className="shadow-2xl shadow-slate-200" />
                    </motion.div>
                </div>

                {/* Preferred Carriers / Partner Section */}
                <div className="mt-24 pt-12 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-8 text-center">Institutional Affiliations</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {['HDFC Life', 'ICICI Lombard', 'Star Health', 'Max Life', 'Tata AIA'].map(partner => (
                            <span key={partner} className="text-lg font-serif italic text-slate-950 font-bold tracking-tight">{partner}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
