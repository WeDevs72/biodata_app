
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testJsonInsert() {
  console.log('Attempting to insert a record with JSON data...')

  const { data, error } = await supabase
    .from('biodata_records')
    .insert([
      {
        name: "JSON Test",
        category: "Job Resume",
        template_used: "professional",
        city: "Test City",
        data: { test: "success", nested: { value: 123 } }
      }
    ])

  if (error) {
    console.error('Insert failed:', error.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
  } else {
    console.log('Insert successful!')
  }
}

testJsonInsert()
