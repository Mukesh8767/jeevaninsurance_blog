'use client';

import { motion } from 'framer-motion';
import CategoryVisual from './CategoryVisual';
import { IMAGES } from '@/lib/assets';

export default function PrinciplesSection() {
    return (
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 grayscale brightness-200">
                <CategoryVisual type="comfort" className="w-full h-full rounded-none" animate={true} />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-24"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Guiding Principles</h2>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Our framework for excellence ensures that every strategic recommendation is built on a foundation of trust and technical precision.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-0 border-l border-slate-800">
                    {[
                        {
                            title: "Radical Transparency",
                            desc: "We demystify the complex, ensuring you understand every facet of your protection.",
                            icon: "01",
                            image: IMAGES.PRINCIPLES.TRANSPARENCY
                        },
                        {
                            title: "Conflict-Free Advice",
                            desc: "Our recommendations are driven by your unique requirements, not provider incentives.",
                            icon: "02",
                            image: IMAGES.PRINCIPLES.CONFLICT_FREE
                        },
                        {
                            title: "Legacy Orientation",
                            desc: "We look beyond immediate coverage toward multi-generational wealth preservation.",
                            icon: "03",
                            image: IMAGES.PRINCIPLES.LEGACY
                        }
                    ].map((val, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative p-12 border-r border-slate-800 hover:bg-slate-800/80 transition-all duration-500 group overflow-hidden"
                        >
                            <img
                                src={val.image}
                                alt={val.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10"
                            />

                            <span className="text-4xl font-serif text-slate-700 font-bold mb-8 block group-hover:text-secondary transition-colors">{val.icon}</span>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-secondary transition-colors">{val.title}</h3>
                            <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
