
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixRLS() {
  console.log('Attempting to disable RLS or add policy for biodata_records...')

  // Using rpc or direct sql via service role key is not directly possible through the JS client for DDL
  // But we can try to use the 'pg' extension if available or just inform the user.
  // Actually, Supabase client doesn't support DDL like "ALTER TABLE".

  console.log('IMPORTANT: I cannot run SQL DDL (like ALTER TABLE) directly via the Supabase JS Client.')
  console.log('However, I can try to check if the data is accessible via the service role key.')

  const { data, error } = await supabase.from('biodata_records').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching with service key:', error.message)
  } else {
    console.log('Successfully fetched records with service key. Count:', data.length)
    console.log('Last 5 records:')
    console.log(JSON.stringify(data.slice(0, 5), null, 2))
  }
}

fixRLS()
