
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

async function findSettings() {
  const { data, error } = await supabase
    .from('biodata_records')
    .select('*')
    .eq('name', '__SYSTEM_SETTINGS__')
    .single();

  if (error) {
    console.log('No system settings found in biodata_records.');
  } else {
    console.log('Found system settings:', data.data);
  }
}

findSettings()
