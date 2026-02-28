'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Who is Satish Mishra and what is JivanSecure?",
        answer: "Satish Mishra is a trusted and experienced Financial Advisor in India. JivanSecure is his financial advisory platform offering expert guidance in insurance planning, mutual funds, SIP investments, and long-term wealth creation for Indians and NRIs.",
        quote: "“Trust is built when advice is honest and goals come first.”"
    },
    {
        question: "What financial services does JivanSecure provide?",
        answer: "JivanSecure provides end-to-end financial planning services, including Life & Health Insurance Planning, Mutual Funds & SIP Investment Advisory, Retirement & Goal-Based Planning, and NRI Financial & Investment Advisory."
    },
    {
        question: "Is JivanSecure suitable for NRIs and Global Indians?",
        answer: "Yes. JivanSecure specializes in NRI financial planning, helping Global Indians manage investments, insurance, and long-term goals in India with clarity and compliance.",
        quote: "“Distance should never be a barrier to financial security.”"
    },
    {
        question: "How is JivanSecure different from other financial advisors?",
        answer: "JivanSecure follows a client-first, transparent, and goal-based approach. There is no product pushing or hidden agenda—only ethical financial advice aligned with your life goals."
    },
    {
        question: "Does JivanSecure help beginners in investing?",
        answer: "Absolutely. We guide beginners step by step in mutual fund investments, SIPs, and insurance selection, making financial planning simple and easy to understand.",
        quote: "“You don’t need to be an expert to start investing—just the right guide.”"
    },
    {
        question: "How do I start my financial planning with JivanSecure?",
        answer: "You can start by booking a personal consultation with Satish Mishra. We assess your goals, risk profile, and financial needs before recommending the right strategy."
    },
    {
        question: "Is JivanSecure focused on long-term wealth creation?",
        answer: "Yes. Our philosophy is centered on disciplined investing, risk management, and sustainable long-term wealth creation, not short-term market trends.",
        quote: "“We plan for decades, not for market noise.”"
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-500 font-light italic">Clear answers for your financial peace of mind.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-slate-100 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    suppressHydrationWarning
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group"
                                >
                                    <span className="text-lg font-bold text-primary pr-8">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 space-y-4">
                                                <p className="text-slate-600 leading-relaxed font-light">
                                                    {faq.answer}
                                                </p>
                                                {faq.quote && (
                                                    <p className="text-secondary font-medium italic border-l-2 border-secondary pl-4">
                                                        {faq.quote}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
