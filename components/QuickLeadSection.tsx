'use client';
// Fixed hydration mismatch by forcing re-compile.

import { motion } from 'framer-motion';
import { Heart, Shield, Car, Plane, Home, ShieldAlert, Users, Globe, ArrowRight } from 'lucide-react';

const miniServices = [
    { label: 'Life', icon: Shield },
    { label: 'Health', icon: Heart },
    { label: 'Car', icon: Car },
    { label: 'Bike', icon: ShieldAlert },
    { label: 'Home', icon: Home },
    { label: 'Travel', icon: Plane },
    { label: 'Term', icon: Users },
    { label: 'Cyber', icon: Globe },
];

export default function QuickLeadSection() {
    return (
        <section className="pt-8 lg:pt-12 pb-16 lg:pb-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-6 translate-x-12" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left: Lead Form Wrapper (Inspired by Image 3) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-100 relative z-10"
                    >
                        <div className="mb-8 lg:mb-10">
                            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-2">Get Your Perfect Insurance Plan</h3>
                            <p className="text-slate-500 text-xs lg:text-sm font-light">Fill in your details and discover the best Insurance plan tailored for you and your family.</p>
                        </div>

                        <form className="space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Members to be Insured</label>
                                    <input type="text" placeholder="Enter Your Name" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
                                </div>
                                <div className="space-y-2 pt-6">
                                    <input type="text" placeholder="Enter Your Mobile +91" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Enter Your Age" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
                                <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-slate-400">
                                    <option>Insurance Type</option>
                                    <option>Life</option>
                                    <option>Health</option>
                                    <option>Motor</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Enter Location Details</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="i.e. Mumbai, Nagpur" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
                                    <input type="text" placeholder="Enter Your Pincode" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 lg:py-4 lg:px-6 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-secondary text-white font-bold py-4 lg:py-5 rounded-xl shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                            >
                                Submit & Get A Call
                                <ArrowRight size={14} />
                            </motion.button>

                            <p className="text-center text-xs text-slate-400">
                                Having any difficulties? <a href="#contact" className="text-secondary font-bold hover:underline">Contact us</a>
                            </p>
                        </form>
                    </motion.div>

                    {/* Right: Icon Grid & Heading (Inspired by Image 3) */}
                    <div className="lg:col-span-7 space-y-8 lg:space-y-12 mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-4 lg:mb-6">
                                Your Safety, Our Priority
                            </span>
                            <h2 className="text-4xl lg:text-7xl font-bold text-primary tracking-tighter leading-[0.9] mb-4 lg:mb-8">
                                Stop Risking Your Legacy —
                                <br />
                                <span className="text-secondary italic">Secure It with Precision.</span>
                            </h2>
                            <p className="text-slate-500 text-base lg:text-lg font-light leading-relaxed max-w-xl">
                                We help you stay protected against life's uncertainties with genuine insurance guidance. From health and life to motor coverage — secure what truly matters, before it's too late.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-4">
                            {miniServices.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-slate-50 group hover:bg-white hover:shadow-xl transition-all p-3 lg:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 lg:gap-3 border border-transparent hover:border-slate-100"
                                    >
                                        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-secondary/10 transition-colors">
                                            <Icon className="text-primary w-4 h-4 lg:w-6 lg:h-6 group-hover:text-secondary transition-colors" />
                                        </div>
                                        <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-primary">{item.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
