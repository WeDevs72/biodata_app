const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedSikhFloral() {
  console.log('Inserting `sikh-floral` matrimonial template into database...')
  const { data, error } = await supabase
    .from('templates')
    .insert([
      {
        name: 'sikh-floral',
        category: 'Matrimonial',
        price: 51,
        discount_price: null,
        is_active: true
      }
    ])
    .select()

  if (error) {
    console.error('Error seeding template:', error.message)
  } else {
    console.log('Sikh Floral Accent template seeded successfully!')
    console.log(data)
  }
}

seedSikhFloral()
