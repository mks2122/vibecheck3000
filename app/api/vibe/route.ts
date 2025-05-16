import { NextResponse } from 'next/server'
import { queryLLM } from '@/lib/llmUtil'

export async function POST(request: Request) {
  const { systemInstruction, userPrompt } = await request.json()

  if (!systemInstruction || !userPrompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
  }

  try {
    const text = await queryLLM(systemInstruction, userPrompt)
    return NextResponse.json({ text })
  } catch (err) {
    console.error('[LLM Error]', err)
    return NextResponse.json({ error: 'LLM error' }, { status: 500 })
  }
}
