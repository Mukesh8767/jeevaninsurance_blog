const url = 'https://xotskowvuhfugfkvpuws.supabase.co/rest/v1/posts?select=*'
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function checkData() {
    try {
        const res = await fetch(url, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        })
        const data = await res.json()
        console.log('Posts found:', data.length)
        if (data.length > 0) {
            console.log('Sample post:', {
                title: data[0].title,
                status: data[0].status,
                category_id: data[0].category_id,
                slug: data[0].slug
            })
        }
    } catch (e) {
        console.error('Fetch error:', e)
    }
}

checkData()
