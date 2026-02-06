import Hero from '@/components/Hero';
import SolutionsTabs from '@/components/SolutionsTabs';
import CategoryVisual from '@/components/CategoryVisual';
import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SolutionsTabs />

      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-24 items-center">
          <div className='relative'>
            {/* Visual Frame for Portrait */}
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 bg-slate-50 rounded-2xl transform translate-x-6 translate-y-6 -z-10 border border-slate-100" />
              <div className="absolute -top-12 -left-12 w-48 h-48 -z-10 opacity-40">
                <CategoryVisual type="nri" className="w-full h-full rounded-full" animate={true} />
              </div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-2xl">
                {/* Visual placeholder for professional portrait */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-400 font-serif italic text-lg tracking-widest uppercase">Professional Portrait</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold text-2xl tracking-tight">Satish Mishra</p>
                  <p className="text-slate-300 text-sm font-medium tracking-widest uppercase">Founder & Lead Adviser</p>
                </div>
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white py-4 px-6 rounded-none border border-slate-200 shadow-xl hidden md:block">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                <p className="text-2xl font-bold text-slate-900 font-serif">15+ Years</p>
              </div>
            </div>
          </div>

          <div className='space-y-10'>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-blue-600"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Founder's Perspective</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              A commitment to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">unbiased clarity.</span>
            </h2>

            <div className="space-y-8 text-xl text-slate-600 leading-relaxed font-light">
              <p>
                In an era of automated advice and complex fine print, we return to the fundamental principle of financial advisory: <strong className="text-slate-900 font-medium">unwavering transparency.</strong>
              </p>
              <p>
                JivanSecure was built to transform the insurance landscape from a product-selling industry into a service-oriented partnership. We don't analyze policies; we analyze your legacy.
              </p>
            </div>

            <div className="pt-6">
              <Link href="/about" className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-blue-700 transition-colors">
                Our Advisory Model
                <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                  <Quote size={14} className="rotate-180" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section - Global Consultancy Style */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background visual */}
        <div className="absolute inset-0 opacity-10 grayscale brightness-200">
          <CategoryVisual type="comfort" className="w-full h-full rounded-none" animate={true} />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Guiding Principles</h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Our framework for excellence ensures that every strategic recommendation is built on a foundation of trust and technical precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-l border-slate-800">
            {[
              { title: "Radical Transparency", desc: "We demystify the complex, ensuring you understand every facet of your protection.", icon: "01" },
              { title: "Conflict-Free Advice", desc: "Our recommendations are driven by your unique requirements, not provider incentives.", icon: "02" },
              { title: "Legacy Orientation", desc: "We look beyond immediate coverage toward multi-generational wealth preservation.", icon: "03" }
            ].map((val, idx) => (
              <div key={idx} className="p-12 border-r border-slate-800 hover:bg-slate-800/50 transition-colors duration-500 group">
                <span className="text-4xl font-serif text-slate-700 font-bold mb-8 block group-hover:text-blue-500 transition-colors">{val.icon}</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{val.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section - Thought Leadership */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className='max-w-2xl'>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                Insights
              </div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Thought Leadership</h2>
            </div>
            <Link href="/insights" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors pb-2 border-b border-slate-100">
              View All Analysis
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <Link href="#" className="group">
              <div className="aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden mb-8 relative border border-slate-100 shadow-xl shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200"
                  alt="Future of Healthcare"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-slate-900">Research Paper</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">The Future of Family Healthcare in Post-Pandemic India</h3>
              <p className="text-slate-500 font-light line-clamp-2">A deep dive into how critical illness coverage is evolving to meet new medical challenges and rising costs.</p>
            </Link>
            <Link href="#" className="group">
              <div className="aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden mb-8 relative border border-slate-100 shadow-xl shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
                  alt="Wealth Transfer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-slate-900">Strategy</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Wealth Transfer: Navigating Inheritance Complexity</h3>
              <p className="text-slate-500 font-light line-clamp-2">How Term Insurance serves as the cornerstone for a modern estate planning strategy for High Net Worth individuals.</p>
            </Link>
          </div>
        </div>
      </section>
      {/* Strategic Engagement CTA */}
      <section className="py-48 bg-slate-950 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <CategoryVisual type="retirement" className="w-full h-full rounded-none" animate={true} />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="inline-flex items-center gap-4 text-blue-400">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Engagement</span>
              <span className="h-px w-8 bg-blue-500"></span>
            </div>

            <h2 className="text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
              Ready to <br />
              <span className="text-slate-500">define your strategy?</span>
            </h2>

            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Join the 2,500+ families who have secured their future through our data-driven advisory. Your first strategic briefing is complimentary.
            </p>

            <div className="pt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl shadow-blue-500/20"
              >
                Request a Strategic Briefing
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-slate-800 opacity-20 translate-x-12 -translate-y-12" />
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-slate-800 opacity-20 -translate-x-12 translate-y-12" />
      </section>
    </div>
  );
}
