
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSelect() {
  console.log('Attempting to select records with anon key...')

  const { data, error } = await supabase
    .from('biodata_records')
    .select('*')

  if (error) {
    console.error('Select failed:', error.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
  } else {
    console.log('Select successful! Count:', data.length)
    if (data.length > 0) {
        console.log('First record name:', data[0].name)
    }
  }
}

testSelect()
