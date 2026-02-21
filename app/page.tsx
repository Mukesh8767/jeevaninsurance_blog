'use client';

import Hero from '@/components/Hero';
import SolutionsTabs from '@/components/SolutionsTabs';
import CategoryVisual from '@/components/CategoryVisual';
import Link from 'next/link';
import { Quote, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/assets';
import FeatureHighlights from '@/components/FeatureHighlights';
import FAQ from '@/components/FAQ';
import AboutTabs from '@/components/AboutTabs';
import IntelligentProtection from '@/components/IntelligentProtection';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SolutionsTabs />
      {/* <IntelligentProtection /> */}
      <FeatureHighlights />
      <AboutTabs />
      {/* FAQ Section */}
      <FAQ />

      {/* Engagement Contact Info */}
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

      {/* Principles Section */}
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

      {/* Insights Section - Thought Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className='max-w-2xl'>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                Market Analysis
              </div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Technical Case Studies</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <Link href="/post/1" className="group">
              <div className="aspect-[16/9] bg-slate-100 rounded-[2rem] overflow-hidden mb-8 relative border border-slate-100 shadow-xl shadow-slate-200/50">
                <img
                  src={IMAGES.INSIGHTS.HEALTHCARE_FUTURE}
                  alt="Future of Healthcare"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-primary rounded-full">Health Analysis</div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">The Future of Family Healthcare in Post-Pandemic India</h3>
              <p className="text-slate-500 font-light line-clamp-2">A deep dive into how critical illness coverage is evolving to meet new medical challenges and rising costs.</p>
            </Link>
            <Link href="/post/2" className="group">
              <div className="aspect-[16/9] bg-slate-100 rounded-[2rem] overflow-hidden mb-8 relative border border-slate-100 shadow-xl shadow-slate-200/50">
                <img
                  src={IMAGES.INSIGHTS.WEALTH_TRANSFER}
                  alt="Wealth Transfer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-primary rounded-full">Legacy Strategy</div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">Wealth Transfer: Navigating Inheritance Complexity</h3>
              <p className="text-slate-500 font-light line-clamp-2">How Term Insurance serves as the cornerstone for a modern estate planning strategy for High Net Worth individuals.</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
