const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSelect() {
  const { data, error } = await supabase
    .from('templates')
    .select('*')

  if (error) {
    console.error('Select failed:', error.message)
  } else {
    console.log('Select successful! Count:', data.length)
    console.log(data)
  }
}

testSelect()
