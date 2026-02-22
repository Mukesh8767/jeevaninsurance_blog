'use client';

import PremiumHeroVisual from './PremiumHeroVisual';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Heart, Car, ShieldAlert, Home as HomeIcon, Plane, Users, Globe, Phone } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-18 pb-12 lg:pt-10 lg:pb-10 bg-white">
            <PremiumHeroVisual />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center">

                    {/* Left side: Heading & CTA */}
                    <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-left pt-8 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-4">
                                Premium Insurance Advisory
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter text-primary leading-[0.95] mb-6 lg:mb-8">
                                Trusted <br />
                                <motion.span
                                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-secondary inline-block mt-2"
                                >
                                    Insurance Solutions.
                                </motion.span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-xl font-light">
                                Securing your Life, Health, and Vehicles with expert guidance from <span className="text-primary font-semibold italic">Satish Mishra</span>. Experience precision in protection.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">IRDAI Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Claims Guaranteed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">100% Transparent</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Lead Form (Inspired by user request) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 flex justify-center lg:justify-end"
                    >
                        <div className="w-full max-w-[500px] bg-white/70 backdrop-blur-2xl p-8 lg:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,1,85,0.12)] border border-white/50 relative z-10 lg:scale-[1.02]">
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/10 blur-3xl rounded-full" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

                            <div className="mb-6 text-center lg:text-left">
                                <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2 tracking-tighter">Secure Your Future</h3>
                                <p className="text-slate-500 text-sm font-light leading-relaxed">
                                    Get a personalized consultation and premium quote within minutes.
                                </p>
                            </div>

                            <ContactForm
                                isWhatsAppRedirection={true}
                                hideHeader={true}
                                isCompact={true}
                                className="p-0 bg-transparent border-0 shadow-none"
                            />

                            <div className="pt-8 flex flex-col items-center gap-4">
                                <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                                    Trusted by <span className="text-primary font-bold">2,500+</span> Institutional Clients
                                </p>
                                <div className="flex items-center gap-4 text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                                    <div className="flex items-center gap-1.5">
                                        <Shield size={12} className="text-secondary" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    <div className="flex items-center gap-1.5">
                                        <Globe size={12} className="text-secondary" />
                                        <span>IRDAI Certified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
