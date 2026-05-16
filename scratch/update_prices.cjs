const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updatePrices() {
  console.log('Updating Matrimonial templates to 51...')
  await supabase.from('templates').update({ price: 51, discount_price: null }).eq('category', 'Matrimonial')
  
  console.log('Updating Job Resume templates to 79...')
  await supabase.from('templates').update({ price: 79, discount_price: null }).eq('category', 'Job Resume')
  
  console.log('Updating Business templates to 89...')
  await supabase.from('templates').update({ price: 89, discount_price: null }).eq('category', 'Business')

  console.log('Done!')
}

updatePrices()
