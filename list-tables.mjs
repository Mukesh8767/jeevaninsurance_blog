const url = 'https://xotskowvuhfugfkvpuws.supabase.co/rest/v1/'
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function checkTables() {
    try {
        const res = await fetch(url + '?select=name', {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        })
        console.log('Response status:', res.status)
        const text = await res.text()
        console.log('Response body:', text)
    } catch (e) {
        console.error('Fetch error:', e)
    }
}

checkTables()
