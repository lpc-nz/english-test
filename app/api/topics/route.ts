import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await getSupabase()
    .from('questions')
    .select('topic')
    .order('topic')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const topics = [...new Set((data ?? []).map((r: { topic: string }) => r.topic))]
  return NextResponse.json(topics)
}
