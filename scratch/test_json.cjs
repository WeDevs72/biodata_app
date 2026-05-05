
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Manually parse .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local')
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
