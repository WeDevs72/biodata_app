
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  const email = 'admin@biodataearth.com'
  const password = 'AdminPassword123!' // Using a more secure password

  console.log(`Attempting to create admin user: ${email}`)

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('Admin user already exists. Updating password...')
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers()
      if (listError) {
        console.error('Error listing users:', listError)
        return
      }
      const user = listData.users.find(u => u.email === email)
      if (user) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, { password })
        if (updateError) {
          console.error('Error updating password:', updateError)
        } else {
          console.log('Password updated successfully.')
        }
      }
    } else {
      console.error('Error creating admin user:', error.message)
    }
  } else {
    console.log('Admin user created successfully!')
  }
}

createAdmin()
