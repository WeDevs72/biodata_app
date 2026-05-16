
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testInsert() {
  console.log('Attempting to insert a test record with anon key...')

  const { data, error } = await supabase
    .from('biodata_records')
    .insert([
      {
        name: "Test User",
        category: "Job Resume",
        template_used: "professional",
        city: "Test City",
        is_downloaded: false,
        is_flagged: false,
        created_at: new Date().toISOString()
      }
    ])
    .select()

  if (error) {
    console.error('Insert failed:', error.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
  } else {
    console.log('Insert successful!')
    console.log('Data:', data)
  }
}

testInsert()
