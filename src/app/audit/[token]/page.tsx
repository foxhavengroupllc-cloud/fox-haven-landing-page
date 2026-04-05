'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuditShell } from '@/components/audit/AuditShell';
import { QuestionCard } from '@/components/audit/QuestionCard';
import { AuditComplete } from '@/components/audit/AuditComplete';
import { getVisibleQuestions, SECTION_LABELS } from '@/lib/audit/questions';

export default function AuditFlowPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [isComplete, setIsComplete] = useState(false);

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentIndex];

  const handleSelect = useCallback(
    async (value: string) => {
      if (!currentQuestion) return;

      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);

      fetch('/api/audit/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, questionId: currentQuestion.id, answer: value, step: currentIndex }),
      }).catch(console.error);

      setTimeout(() => {
        const updatedVisible = getVisibleQuestions(newAnswers);
        if (currentIndex + 1 >= updatedVisible.length) {
          setIsComplete(true);
          fetch('/api/audit/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          }).catch(console.error);
        } else {
          setDirection('forward');
          setCurrentIndex(currentIndex + 1);
        }
      }, 280);
    },
    [currentQuestion, answers, currentIndex, token]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) { setDirection('back'); setCurrentIndex(currentIndex - 1); }
  }, [currentIndex]);

  const handleFinish = useCallback(() => {
    router.push(`/audit/results/${token}`);
  }, [router, token]);

  if (isComplete) return <AuditComplete onFinish={handleFinish} />;
  if (!currentQuestion) return null;

  return (
    <AuditShell currentStep={currentIndex} totalSteps={visibleQuestions.length} sectionLabel={SECTION_LABELS[currentQuestion.section]}>
      <QuestionCard question={currentQuestion} selectedValue={answers[currentQuestion.id]} onSelect={handleSelect} direction={direction} />
      {currentIndex > 0 && (
        <div className="max-w-[600px] mx-auto px-6 pb-8">
          <button onClick={handleBack} className="text-[#4A5A78] hover:text-[#9BAAC2] text-[14px] font-[family-name:var(--font-body)] transition-colors">
            &larr; Previous
          </button>
        </div>
      )}
    </AuditShell>
  );
}
