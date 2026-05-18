import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const { error } = await supabase.from('questions').delete().in('test_number', [1, 2, 3, 4])
  if (error) { console.error('Delete failed:', error.message); process.exit(1) }
  console.log('Old test questions deleted.')
}

main()
