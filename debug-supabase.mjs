import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkData() {
    console.log('Checking categories...')
    const { data: cats, error: catErr } = await supabase.from('categories').select('*')
    console.log('Categories:', cats?.map(c => ({ title: c.title, slug: c.slug, id: c.id })))

    console.log('\nChecking posts...')
    const { data: posts, error: postErr } = await supabase.from('posts').select('*')
    console.log('Total posts:', posts?.length)
    if (posts) {
        console.log('Posts info:', posts.map(p => ({ title: p.title, status: p.status, category_id: p.category_id })))
    }
}

checkData()
