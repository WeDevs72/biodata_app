
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const sampleRecords = [
  {
    name: "Amit Kumar",
    category: "Matrimonial",
    template_used: "Royal Purple",
    city: "Mumbai",
    is_downloaded: true,
    is_flagged: false,
    created_at: new Date().toISOString()
  },
  {
    name: "Sanya Gupta",
    category: "Job Resume",
    template_used: "Professional",
    city: "Delhi",
    is_downloaded: false,
    is_flagged: true,
    created_at: new Date().toISOString()
  },
  {
    name: "Rajesh Chen",
    category: "Business",
    template_used: "Classic Gold",
    city: "Bangalore",
    is_downloaded: true,
    is_flagged: false,
    created_at: new Date().toISOString()
  }
]

async function seedData() {
  console.log('Seeding biodata_records table...')
  const { data, error } = await supabase
    .from('biodata_records')
    .insert(sampleRecords)

  if (error) {
    console.error('Error seeding data:', error.message)
  } else {
    console.log('Data seeded successfully!')
  }
}

seedData()
