import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function fetchData() {
    console.log('--- Categories ---')
    const { data: categories } = await supabase.from('categories').select('*')
    console.log(JSON.stringify(categories, null, 2))

    console.log('\n--- Subcategories ---')
    const { data: subcategories } = await supabase.from('subcategories').select('*')
    console.log(JSON.stringify(subcategories, null, 2))

    console.log('\n--- Recent Posts ---')
    const { data: posts } = await supabase.from('posts').select('id, title, category_id, subcategory_id, slug').limit(5)
    console.log(JSON.stringify(posts, null, 2))
}

fetchData()
