import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const count = Math.min(Math.max(parseInt(searchParams.get('count') ?? '10', 10), 1), 100)
  const topic = searchParams.get('topic') || null

  const { data, error } = await supabase.rpc('get_random_questions', {
    p_count: count,
    p_topic: topic,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
