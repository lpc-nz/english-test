import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await getSupabase().from('questions').select('topic')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const topics = [...new Set((data as { topic: string }[]).map(r => r.topic))].sort()
  return NextResponse.json(topics)
}
