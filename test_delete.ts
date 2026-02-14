
import { createClient } from './lib/supabaseClient';

async function testDelete() {
    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', 'some-id');
    console.log('Delete error:', error);
}

testDelete();
