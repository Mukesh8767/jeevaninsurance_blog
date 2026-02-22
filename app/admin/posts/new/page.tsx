'use client'

import { useState, useEffect } from 'react'
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
import CoverImageSelector from '@/components/CoverImageSelector'

export default function CreatePostPage() {
  const supabase = createClient()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [status, setStatus] = useState<'draft' | 'pending' | 'published'>('pending')
  const [postType, setPostType] = useState<'blog' | 'news'>('blog')
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [blocks, setBlocks] = useState<any[]>([
    {
      id: 'b1',
      type: 'paragraph',
      data: { text: [{ text: '' }] },
      style: { fontSize: '16px', lineHeight: '1.7' }
    }
  ])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<{ role: string, can_post_direct: boolean } | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role, can_post_direct')
          .eq('id', user.id)
          .single()
        if (data) setProfile(data)
      }

      // Fetch categories with nested subcategories
      const { data: cats } = await supabase
        .from('categories')
        .select(`
          *,
          subcategories(*)
        `)
        .order('title')

      if (cats) setCategories(cats)
    }
    fetchData()
  }, [])

  // Derive subcategories from the selected category
  const filteredSubcategories = categories.find(c => c.id === selectedCategory)?.subcategories || []

  const generatedSlug =
    slug ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const handleSave = async (finalStatus: typeof status) => {
    if (!title.trim()) return alert('Title is required')
    if (!selectedCategory) return alert('Please select a category')

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase.from('posts').insert({
        title,
        slug: generatedSlug,
        status: (profile?.role === 'admin' || profile?.can_post_direct) ? finalStatus : (finalStatus === 'published' ? 'pending' : finalStatus),
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory || null,
        cover_image_url: coverImageUrl || null,
        post_type: postType,
        blocks,
        author_id: user.id
      })

      if (error) throw error

      router.push('/admin/posts')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
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
            <span className="text-sm text-slate-500">
              {status === 'draft' && 'Draft'}
              {status === 'pending' && 'Pending Review'}
              {status === 'published' && 'Ready to Publish'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-100 flex items-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Draft
            </button>

            {profile?.role === 'admin' && (
              <button
                onClick={() => handleSave('published')}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-500 flex items-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                Publish Post
              </button>
            )}

            <button
              onClick={() => handleSave('pending')}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 flex items-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
              {profile?.role === 'admin' ? 'Save as Pending' : 'Submit for Review'}
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
              <CoverImageSelector url={coverImageUrl} onChange={setCoverImageUrl} />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Post Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                    <button
                      type="button"
                      onClick={() => setPostType('blog')}
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${postType === 'blog' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Blog
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostType('news')}
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${postType === 'news' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      News
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setSelectedSubcategory('') // Reset subcategory when category changes
                    }}
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

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    disabled={!selectedCategory || filteredSubcategories.length === 0}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedCategory
                        ? 'Select a category first'
                        : filteredSubcategories.length === 0
                          ? 'No subcategories'
                          : 'Select a Subcategory'}
                    </option>
                    {filteredSubcategories.map((sub: any) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <BlockEditor blocks={blocks} onChange={setBlocks} />
            </div>
          </section>

          {/* PREVIEW (Right) */}
          <section className="flex-1 overflow-y-auto bg-slate-50 p-8 hidden lg:block">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 min-h-full p-12">
              <div className="mb-8">
                {coverImageUrl && (
                  <div className="mb-8 rounded-xl overflow-hidden shadow-lg aspect-video md:aspect-[21/9]">
                    <img src={coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
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