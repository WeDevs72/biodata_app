
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
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function listTables() {
  const { data, error } = await supabase.rpc('get_tables'); // This probably won't work unless defined
  if (error) {
    console.log('RPC get_tables failed, trying query...');
    const { data: data2, error: error2 } = await supabase.from('pg_tables').select('tablename').eq('schemaname', 'public');
    if (error2) {
        console.log('Query pg_tables failed:', error2.message);
    } else {
        console.log('Tables:', data2);
    }
  } else {
    console.log('Tables:', data);
  }
}

listTables()
