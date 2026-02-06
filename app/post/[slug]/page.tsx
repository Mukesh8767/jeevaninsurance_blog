import { createClient } from '@/lib/supabaseServer';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

// Helper to fetch data
async function getPost(slug: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*, categories(title, slug), profiles(full_name)')
        .eq('slug', slug)
        .single();
    return post;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug);
    if (!post) return {};

    return {
        title: `${post.title} | JivanSecure`,
        description: post.title, // In real app, use a dedicated description field or extract from blocks
        openGraph: {
            title: post.title,
            images: post.cover_image_url ? [post.cover_image_url] : [],
        }
    };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Header */}
            <header className="relative h-[400px] md:h-[500px] bg-slate-900 text-white flex items-end">
                {post.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.cover_image_url}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                        alt={post.title}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                <div className="container mx-auto px-4 relative z-10 pb-12">
                    {post.categories && (
                        <Link
                            href={`/category/${post.categories.slug}`}
                            className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 hover:bg-blue-700 transition"
                        >
                            {post.categories.title}
                        </Link>
                    )}
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                        <span>By {post.profiles?.full_name || 'Satish Mishra'}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12 max-w-3xl">
                <PostRenderer blocks={post.blocks} />
            </div>
        </article>
    );
}
