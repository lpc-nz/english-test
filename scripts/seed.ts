import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { QS } from '../data/questions'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

async function seed() {
  const rows = QS.map(({ q, opts, ans, topic, expl }) => ({ q, opts, ans, topic, expl }))
  const { error } = await supabase.from('questions').insert(rows)
  if (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
  console.log(`Seeded ${rows.length} questions successfully.`)
}

seed()
