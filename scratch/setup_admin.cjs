
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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdmin() {
  const email = 'admin@biodataearth.com'
  const password = 'AdminPassword123!'

  console.log(`Attempting to setup admin user: ${email}`)

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    if (error.message.includes('already registered') || error.status === 422) {
      console.log('Admin user might already exist. Attempting to update password...')
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
      } else {
        console.log('User not found in list, but creation failed with "already registered". This is unexpected.')
      }
    } else {
      console.error('Error creating admin user:', error.message)
    }
  } else {
    console.log('Admin user created successfully!')
  }
}

createAdmin()
