import Hero from '@/components/Hero';
import SolutionsTabs from '@/components/SolutionsTabs';
import Link from 'next/link';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import FeatureHighlights from '@/components/FeatureHighlights';
import FAQ from '@/components/FAQ';
import AboutTabs from '@/components/AboutTabs';
import IntelligentProtection from '@/components/IntelligentProtection';
import ContactInfo from '@/components/ContactInfo';
import PrinciplesSection from '@/components/PrinciplesSection';
import { createClient } from '@/lib/supabaseServer';

export const revalidate = 3600;

async function getLatestPosts() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, categories(*)')
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
  const supabase = await createClient();

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                Market Analysis
              </div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Technical Case Studies</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {latestPosts.map((post: any) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group">
                <div className="aspect-[16/9] bg-slate-100 rounded-[2rem] overflow-hidden mb-8 relative border border-slate-100 shadow-xl shadow-slate-200/50">
                  {post.cover_image_url ? (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 grayscale group-hover:grayscale-0 transition-all duration-1000">
                      <Quote size={64} className="text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-primary rounded-full">
                    {post.categories?.title || 'Expert Analysis'}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-500 font-light line-clamp-2">
                  {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this insightful article to learn more...'}
                </p>
              </Link>
            ))}

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
