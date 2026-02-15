'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabaseClient'
import BlockEditor from '@/components/BlockEditor/Editor'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft,
    Save,
    Loader2,
    Eye,
    UploadCloud
} from 'lucide-react'
import Link from 'next/link'
import PostRenderer from '@/components/PostRenderer'

export default function EditPostPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise)
    const supabase = createClient()
    const router = useRouter()
    const { id } = params

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState<'draft' | 'pending' | 'published'>('draft')
    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [blocks, setBlocks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push('/admin/login')
                    return
                }

                // Fetch Profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single()

                // Fetch Categories
                const { data: catData } = await supabase.from('categories').select('*').order('title')
                if (catData) setCategories(catData)

                // Fetch Post
                const { data: post, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                if (post) {
                    // Role Check: Contributors can only edit their own posts
                    if (profile?.role === 'contributor' && post.author_id !== user.id) {
                        alert('You do not have permission to edit this post.')
                        router.push('/admin/posts')
                        return
                    }

                    setTitle(post.title)
                    setSlug(post.slug)
                    setStatus(post.status)
                    setSelectedCategory(post.category_id)
                    setBlocks(post.blocks || [])
                }
            } catch (err: any) {
                alert(err.message)
                router.push('/admin/posts')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id, supabase, router])

    const generatedSlug =
        slug ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

    const handleSave = async (finalStatus: typeof status) => {
        if (!title.trim()) return alert('Title is required')
        if (!selectedCategory) return alert('Please select a category')

        setSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            // Fetch Profile for direct post check
            const { data: profile } = await supabase
                .from('profiles')
                .select('role, can_post_direct')
                .eq('id', user.id)
                .single();

            // Force pending if contributor tries to publish, or use can_post_direct logic
            const updatedStatus = (profile?.role === 'admin' && profile?.can_post_direct) ? finalStatus : (finalStatus === 'published' ? 'pending' : finalStatus);

            const { error } = await supabase
                .from('posts')
                .update({
                    title,
                    slug: generatedSlug,
                    status: updatedStatus,
                    category_id: selectedCategory,
                    blocks,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)

            if (error) throw error

            router.push('/admin/posts')
        } catch (err: any) {
            alert(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-2 text-slate-600 font-medium">Loading post data...</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* TOP BAR */}
            <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/posts" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <span className="text-sm font-bold text-slate-900 block line-clamp-1 max-w-[200px]">
                                Editing: {title}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                Status: {status}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSave('draft')}
                            disabled={saving}
                            className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-100 flex items-center gap-2"
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save as Draft
                        </button>

                        <button
                            onClick={() => handleSave('pending')}
                            disabled={saving}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 flex items-center gap-2"
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                            Submit Changes
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="h-[calc(100vh-65px)] overflow-hidden">
                <div className="flex h-full">
                    {/* EDITOR (Left) */}
                    <section className="flex-1 overflow-y-auto p-8 border-r border-slate-200 bg-white">
                        <div className="max-w-3xl mx-auto">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Post title..."
                                className="w-full text-4xl font-bold placeholder:text-slate-200 focus:outline-none mb-2"
                            />
                            <div className="text-sm text-slate-400 mb-6 flex items-center gap-2">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">slug</span>
                                /blog/{generatedSlug || 'your-post-slug'}
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {blocks.length > 0 && (
                                <BlockEditor blocks={blocks} onChange={setBlocks} />
                            )}
                            {blocks.length === 0 && !loading && (
                                <div className="text-slate-400 p-8 border-2 border-dashed border-slate-100 rounded-xl text-center">
                                    No blocks found. Adding a default block...
                                    <button
                                        onClick={() => setBlocks([{ id: 'b1', type: 'paragraph', data: { text: [{ text: '' }] }, style: { fontSize: '16px', lineHeight: '1.7' } }])}
                                        className="block mx-auto mt-4 text-blue-600 font-bold hover:underline"
                                    >
                                        Add Content Block
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* PREVIEW (Right) */}
                    <section className="flex-1 overflow-y-auto bg-slate-50 p-8 hidden lg:block">
                        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 min-h-full p-12">
                            <div className="mb-8">
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{title || 'Untitled Post'}</h1>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">A</div>
                                    <span>Admin</span>
                                    <span>•</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <PostRenderer blocks={blocks} />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
