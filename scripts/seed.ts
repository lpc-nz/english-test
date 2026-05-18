import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { QS } from '../data/questions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const { error } = await supabase.from('questions').insert(QS)
  if (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
  console.log(`Done! ${QS.length} questions inserted.`)
}

main()
