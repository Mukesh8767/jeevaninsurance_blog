'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*, categories(title)')
            .order('created_at', { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (!error) fetchPosts();
        else alert('Error deleting post');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
                <Link
                    href="/admin/posts/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                >
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Title</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Category</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center text-slate-500">Loading...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-slate-500">No posts found.</td></tr>
                        ) : (
                            posts.map(post => (
                                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{post.categories?.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold uppercase",
                                            post.status === 'published' ? 'bg-green-100 text-green-700' :
                                                post.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-100 text-slate-600'
                                        )}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <Link href={`/admin/posts/${post.id}/edit`} className="p-2 text-slate-400 hover:text-blue-600">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                        {post.status === 'published' && (
                                            <Link href={`/post/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-green-600">
                                                <Eye size={18} />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
