
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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
