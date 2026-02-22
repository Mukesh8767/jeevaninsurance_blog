import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function debugPostQuery() {
    console.log('--- Testing Post Query ---')
    const { data: raw, error: rawErr } = await supabase
        .from('posts')
        .select('*')
        .limit(1)

    console.log('Raw post fetch error:', rawErr)
    console.log('Row count:', raw?.length)

    console.log('\n--- Testing Join with subcategories ---')
    const { data, error } = await supabase
        .from('posts')
        .select('*, categories(title, slug), subcategories(title, slug)')
        .limit(1)

    if (error) {
        console.error('Join error detected:', error.message)
        console.error('Code:', error.code)
    } else {
        console.log('Join successful!')
    }
}

debugPostQuery()
