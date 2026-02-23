'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Quote } from 'lucide-react';

export default function ContactInfo() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm text-center group hover:shadow-xl transition-all duration-500">
                        <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">WhatsApp</h3>
                        <p className="text-slate-500 text-sm mb-6 font-light">Direct line for quick updates.</p>
                        <a href="https://wa.me/919588472632" className="text-secondary font-bold text-lg hover:underline">+91 95884 72632</a>
                    </div>
                    <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm text-center group hover:shadow-xl transition-all duration-500">
                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Call Satish</h3>
                        <p className="text-slate-500 text-sm mb-6 font-light">Personal advisory session.</p>
                        <a href="tel:+919588472632" className="text-primary font-bold text-lg hover:underline">+91 95884 72632</a>
                    </div>
                    <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm text-center group hover:shadow-xl transition-all duration-500">
                        <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Quote size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Email Advisor</h3>
                        <p className="text-slate-500 text-sm mb-6 font-light">For documents & proposals.</p>
                        <a href="mailto:jivansecure@gmail.com" className="text-secondary font-bold text-lg hover:underline underline-offset-4">jivansecure@gmail.com</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
