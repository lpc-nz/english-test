import { config } from 'dotenv'
config({ path: '.env.local' })

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function extractQTexts(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf-8')
  // Match single-quoted strings, including escaped apostrophes (\')
  const matches = [...content.matchAll(/^\s+q:\s+'((?:[^'\\]|\\.)+)',?$/gm)]
  return matches.map(m => m[1].replace(/\\'/g, "'"))
}

const TEST_FILES = [
  { file: 'scripts/seed-test-1.ts', testNumber: 1 },
  { file: 'scripts/seed-test-2.ts', testNumber: 2 },
  { file: 'scripts/seed-test-3.ts', testNumber: 3 },
  { file: 'scripts/seed-test-4.ts', testNumber: 4 },
]

async function main() {
  for (const { file, testNumber } of TEST_FILES) {
    const qTexts = extractQTexts(join(process.cwd(), file))
    console.log(`Test ${testNumber}: extracted ${qTexts.length} question texts from ${file}`)

    let updated = 0
    for (const q of qTexts) {
      const { error } = await supabase
        .from('questions')
        .update({ test_number: testNumber })
        .eq('q', q)
      if (error) {
        console.error(`  ✗ "${q.slice(0, 60)}…"`, error.message)
      } else {
        updated++
      }
    }
    console.log(`  ✓ ${updated}/${qTexts.length} rows assigned test_number = ${testNumber}`)
  }
  console.log('Done.')
}

main()
