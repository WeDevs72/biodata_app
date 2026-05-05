
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

async function testUpdate() {
  console.log('Attempting to update a record with anon key...')

  // Get the last record ID first
  const { data: records, error: selectErr } = await supabase
    .from('biodata_records')
    .select('id')
    .limit(1)
    .order('created_at', { ascending: false })

  if (selectErr || !records || records.length === 0) {
    console.error('Could not find a record to update.')
    return
  }

  const recordId = records[0].id
  console.log('Updating record ID:', recordId)

  const { data, error } = await supabase
    .from('biodata_records')
    .update({ is_downloaded: true })
    .eq('id', recordId)
    .select()

  if (error) {
    console.error('Update failed:', error.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
  } else {
    console.log('Update successful!')
    console.log('Updated data:', data)
  }
}

testUpdate()
