import Hero from '@/components/Hero';
import SolutionsTabs from '@/components/SolutionsTabs';
import Link from 'next/link';
import Image from 'next/image';
import { Quote, Sparkles } from 'lucide-react';
import FeatureHighlights from '@/components/FeatureHighlights';
import FAQ from '@/components/FAQ';
import AboutTabs from '@/components/AboutTabs';
import IntelligentProtection from '@/components/IntelligentProtection';
import ContactInfo from '@/components/ContactInfo';
import PrinciplesSection from '@/components/PrinciplesSection';
import { createClient, createStatelessClient } from '@/lib/supabaseServer';

export const revalidate = 3600;

import { getPostUrl } from '@/lib/blogUtils';

async function getLatestPosts() {
  const supabase = createStatelessClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, categories(*), subcategories(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(2);

  if (error) {
    console.log('Error fetching latest posts:', error);
    // Try simple fetch without join
    const { data: simplePosts } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(2);
    return simplePosts || [];
  }
  return posts || [];
}

export default async function Home() {
  const supabase = createStatelessClient();

  // RAW DEBUG FETCH
  const { data: rawPosts, error: rawError } = await supabase.from('posts').select('*');
  const { data: rawCats } = await supabase.from('categories').select('*');

  const latestPosts = await getLatestPosts();
  return (
    <div className="flex flex-col min-h-screen">
      {/* TEMP DEBUG OVERLAY (Only visible if you know where to look or in source) */}
      <div className="hidden" id="supabase-debug" data-posts={JSON.stringify(rawPosts)} data-cats={JSON.stringify(rawCats)} data-error={JSON.stringify(rawError)}></div>

      <Hero />
      <SolutionsTabs />
      <IntelligentProtection />
      <FeatureHighlights />
      <AboutTabs />
      <FAQ />

      <ContactInfo />
      <PrinciplesSection />

      {/* Insights Section - Thought Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className='max-w-2xl'>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00a859]/5 border border-[#00a859]/10 text-[#00a859] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles size={12} strokeWidth={3} /> Intelligence Hub
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#001f54] tracking-[-0.03em] leading-tight flex items-center gap-4">
                Advisory Reports
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {latestPosts.map((post: any) => {
              const postUrl = getPostUrl(post);

              return (
                <Link key={post.id} href={postUrl} className="group flex flex-col">
                  <div className="aspect-[16/9] bg-slate-50 rounded-[2.5rem] overflow-hidden mb-8 relative border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,31,84,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,31,84,0.15)] transition-all duration-700">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 group-hover:bg-white transition-colors duration-700">
                        <Quote size={48} className="text-slate-100 group-hover:text-[#00a859]/20 transition-all duration-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001f54]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#001f54]/95 backdrop-blur text-[9px] font-black uppercase tracking-[0.2em] text-[#b38b2d] rounded-xl shadow-xl">
                      {post.categories?.title || 'Expert Analysis'}
                    </div>
                  </div>
                  <div className="px-2 space-y-3">
                    <div className="flex items-center gap-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                      <span className="text-[#00a859]">Technical Guide</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#001f54] group-hover:text-[#00a859] transition-colors leading-[1.1] tracking-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-xs line-clamp-2 leading-relaxed opacity-70 italic">
                      "{post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Explore our latest technical assessment and advisory report...'}"
                    </p>
                  </div>
                </Link>
              );
            })}

            {latestPosts.length === 0 && (
              <div className="col-span-2 text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <Quote size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg font-medium">New expert insights coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
