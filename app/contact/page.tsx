'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, ArrowRight, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
                {/* Abstract CSS Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                    

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8"
                    >
                        We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">with you.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Whether it’s a claim, a confusing policy, or just a question about your future — you don't have to figure it out alone.
                    </motion.p>
                </div>
            </section>

            {/* Overlapping Contact Content */}
            <section className="relative z-20 -mt-20 pb-20">
                <div className="container mx-auto px-6 lg:px-12">
                    {/* Floating Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto"
                    >
                        <a href="tel:+919170551000" className="group bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex items-center md:block gap-5 md:gap-0">
                            <div className="flex items-center justify-between md:mb-6 shrink-0">
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Phone size={22} />
                                </div>
                                <ArrowRight className="hidden md:block text-slate-300 group-hover:text-blue-600 transition-colors" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Call Us</h3>
                                <p className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">+91 91705 51000</p>
                                <p className="text-xs text-slate-500 md:mt-2">Mon-Fri, 9am - 6pm</p>
                            </div>
                            <div className="md:hidden text-slate-300 group-hover:text-blue-600 transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </a>

                        <a href="https://wa.me/919588472632" target="_blank" className="group bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex items-center md:block gap-5 md:gap-0">
                            <div className="flex items-center justify-between md:mb-6 shrink-0">
                                <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-600 rounded-xl group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                                    <MessageCircle size={22} />
                                </div>
                                <ArrowRight className="hidden md:block text-slate-300 group-hover:text-green-600 transition-colors" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">WhatsApp</h3>
                                <p className="text-lg font-bold text-slate-900 group-hover:text-green-600 transition-colors">Chat Instantly</p>
                                <p className="text-xs text-slate-500 md:mt-2">Response within 5m</p>
                            </div>
                            <div className="md:hidden text-slate-300 group-hover:text-green-600 transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </a>

                        <a href="mailto:care@jivansecure.com" className="group bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex items-center md:block gap-5 md:gap-0">
                            <div className="flex items-center justify-between md:mb-6 shrink-0">
                                <div className="w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Mail size={22} />
                                </div>
                                <ArrowRight className="hidden md:block text-slate-300 group-hover:text-purple-600 transition-colors" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</h3>
                                <p className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors truncate">care@jivansecure.com</p>
                                <p className="text-xs text-slate-500 md:mt-2">Response within 24h</p>
                            </div>
                            <div className="md:hidden text-slate-300 group-hover:text-purple-600 transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </a>
                    </motion.div>

                    {/* Contact Form Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
                                    <p className="text-slate-500">Fill out the form below and we'll get back to you shortly.</p>
                                </div>
                                <ContactForm className="shadow-none border-0 p-0" />
                            </div>
                            <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" />
                                    <span>Pune, Maharashtra, India</span>
                                </div>
                                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>9:00 AM - 6:00 PM (IST)</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
