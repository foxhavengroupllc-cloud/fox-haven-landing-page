import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { QUESTIONS } from '@/lib/audit/questions';

const VALID_QUESTION_IDS = new Set(QUESTIONS.map((q) => q.id));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    const questionId = typeof body.questionId === 'string' ? body.questionId.trim() : '';
    const answer = typeof body.answer === 'string' ? body.answer.trim().slice(0, 100) : '';
    const step = typeof body.step === 'number' && Number.isInteger(body.step) && body.step >= 0 ? body.step : undefined;

    if (!token || !questionId || !answer)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    if (!VALID_QUESTION_IDS.has(questionId))
      return NextResponse.json({ error: 'Invalid question' }, { status: 400 });

    const { data: session, error: fetchErr } = await supabase
      .from('audit_sessions')
      .select('id, answers, current_step')
      .eq('token', token)
      .single();

    if (fetchErr || !session)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const currentAnswers = (session.answers as Record<string, string>) || {};
    const updatedAnswers = { ...currentAnswers, [questionId]: answer };

    const { error: updateErr } = await supabase
      .from('audit_sessions')
      .update({
        answers: updatedAnswers,
        current_step: step ?? (session.current_step ?? 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('token', token);

    if (updateErr) throw new Error(updateErr.message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Audit answer error:', error);
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
  }
}
