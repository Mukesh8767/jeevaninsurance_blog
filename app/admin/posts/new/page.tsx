'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import BlockEditor from '@/components/BlockEditor/Editor';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('draft');
    const [slug, setSlug] = useState('');
    const [blocks, setBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSave = async () => {
        if (!title) return alert('Title is required');
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Logic to generate slug if empty
            const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            const { error } = await supabase.from('posts').insert({
                title,
                slug: finalSlug,
                status,
                blocks,
                author_id: user.id, // RLS enforces this matches auth.uid()
            });

            if (error) throw error;
            router.push('/admin/posts');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-slate-50 py-4 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Create New Post</h1>
                </div>
                <div className="flex gap-2">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                    >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending Review</option>
                        <option value="published">Published</option>
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Post
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-500 text-sm"
                                placeholder="auto-generated-slug"
                            />
                        </div>
                        {/* Category Selector would go here */}
                    </div>
                </div>

                <div className="bg-slate-100 min-h-[500px] rounded-xl border-2 border-dashed border-slate-200">
                    <BlockEditor blocks={blocks} onChange={setBlocks} />
                </div>
            </div>
        </div>
    );
}
