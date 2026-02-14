'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PremiumHeroVisual from './PremiumHeroVisual';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32 bg-white flex flex-col items-center justify-center min-h-[85vh]">
            <PremiumHeroVisual />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto space-y-8 lg:space-y-12"
                >
                    <div className="space-y-6 py-6">
                       
                        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter text-primary leading-[1.1] lg:leading-[0.9]">
                            Trusted <br className="hidden md:block" />
                            <motion.span
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-secondary inline-block mt-2"
                            >
                                Insurance Solutions.
                            </motion.span>
                        </h1>
                    </div>

                    <p className="text-lg lg:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-light">
                        Securing your Life, Health, and Vehicles with expert advice from Satish Mishra.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-8">
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="#solutions"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-12 lg:py-6 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all shadow-xl lg:shadow-2xl shadow-primary/30 rounded-full w-full sm:w-auto"
                        >
                            <motion.div
                                className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            />
                            <span className="relative z-10 flex items-center gap-3 group-hover:px-2 transition-all duration-300">
                                Get Quote
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="#about"
                            className="inline-flex items-center justify-center px-8 py-4 lg:px-12 lg:py-6 bg-white text-primary text-xs font-bold uppercase tracking-[0.2em] border border-slate-200 hover:border-secondary hover:text-secondary transition-all rounded-full shadow-sm w-full sm:w-auto"
                        >
                            Our Philosophy
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
