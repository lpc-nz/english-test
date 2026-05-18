import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params
  const id = parseInt(testId, 10)

  if (isNaN(id) || id < 1 || id > 4) {
    return NextResponse.json({ error: 'Invalid test ID' }, { status: 400 })
  }

  const { data, error } = await getSupabase()
    .from('questions')
    .select('*')
    .eq('test_number', id)
    .order('id', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'No questions found for this test' }, { status: 404 })
  }

  return NextResponse.json(data)
}
