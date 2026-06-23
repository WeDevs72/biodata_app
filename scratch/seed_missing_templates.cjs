const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const newTemplates = [
  // Job Resume Templates
  {
    name: 'executive-premium',
    category: 'Job Resume',
    price: 79,
    discount_price: null,
    is_active: true
  },
  {
    name: 'elegant-saffron',
    category: 'Job Resume',
    price: 79,
    discount_price: null,
    is_active: true
  },
  {
    name: 'classic-professional',
    category: 'Job Resume',
    price: 79,
    discount_price: null,
    is_active: true
  },

  // Business Profile Templates
  {
    name: 'royal-indian',
    category: 'Business',
    price: 89,
    discount_price: null,
    is_active: true
  },
  {
    name: 'startup-bold',
    category: 'Business',
    price: 89,
    discount_price: null,
    is_active: true
  },
  {
    name: 'minimal-elegant',
    category: 'Business',
    price: 89,
    discount_price: null,
    is_active: true
  }
]

async function seedMissingTemplates() {
  console.log('Inserting missing templates into `templates` table...')
  const { data, error } = await supabase
    .from('templates')
    .insert(newTemplates)
    .select()

  if (error) {
    console.error('Error inserting templates:', error.message)
  } else {
    console.log('Templates inserted successfully! Count:', data.length)
    console.log(data)
  }
}

seedMissingTemplates()
