'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  XCircle,
  Lightning,
  Trophy,
  ArrowCounterClockwise,
} from '@phosphor-icons/react';
import type { Question } from '@/types/quiz';

type Topic = { name: string; theory_html: string };
type Screen = 'select' | 'theory' | 'quiz';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

const fadeUp = {
  initial: { y: 12, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ── Main controller ───────────────────────────────────────────────────────────

export default function PracticeMode() {
  const [screen, setScreen] = useState<Screen>('select');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selected, setSelected] = useState<Topic | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/practice/topics')
      .then(r => r.json())
      .then(setTopics)
      .catch(() => {});
  }, []);

  const chooseTopic = (topic: Topic) => {
    setSelected(topic);
    setScore({ correct: 0, total: 0 });
    setScreen('theory');
  };

  const fetchQuestion = async (topicName: string) => {
    setLoading(true);
    setAnswered(null);
    try {
      const qs: Question[] = await fetch(
        `/api/questions?count=1&topic=${encodeURIComponent(topicName)}`
      ).then(r => r.json());
      setQuestion(qs[0] ?? null);
    } finally {
      setLoading(false);
    }
  };

  const startPractice = async () => {
    if (!selected) return;
    await fetchQuestion(selected.name);
    setScreen('quiz');
  };

  const pickAnswer = (idx: number) => {
    if (answered !== null || !question) return;
    setAnswered(idx);
    setScore(s => ({
      correct: s.correct + (idx === question.ans ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextQuestion = () => {
    if (selected) fetchQuestion(selected.name);
  };

  const endPractice = () => {
    setScreen('select');
    setSelected(null);
    setQuestion(null);
    setAnswered(null);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      <AnimatePresence mode="wait">
        {screen === 'select' && (
          <SelectScreen key="select" topics={topics} onChoose={chooseTopic} />
        )}
        {screen === 'theory' && selected && (
          <TheoryScreen
            key="theory"
            topic={selected}
            onBack={() => setScreen('select')}
            onStart={startPractice}
          />
        )}
        {screen === 'quiz' && selected && (
          <QuizScreen
            key="quiz"
            topic={selected}
            question={question}
            answered={answered}
            score={score}
            loading={loading}
            onPick={pickAnswer}
            onNext={nextQuestion}
            onEnd={endPractice}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Select Screen ─────────────────────────────────────────────────────────────

function SelectScreen({
  topics,
  onChoose,
}: {
  topics: Topic[];
  onChoose: (t: Topic) => void;
}) {
  return (
    <motion.div
      className="min-h-[100dvh] px-6 py-14 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* Back to tests */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors mb-10"
      >
        <ArrowLeft size={14} weight="bold" />
        Back to Tests
      </Link>

      {/* Header */}
      <motion.div
        {...fadeUp}
        animate={fadeUp.animate}
        transition={{ delay: 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-[11px] font-black tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-7"
      >
        <Lightning size={13} weight="bold" />
        Practice Mode
      </motion.div>

      <motion.h1
        {...fadeUp}
        animate={fadeUp.animate}
        transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(34px,5vw,56px)] font-extrabold leading-none tracking-[-0.03em] text-slate-900 mb-3"
      >
        Choose a topic
      </motion.h1>

      <motion.p
        {...fadeUp}
        animate={fadeUp.animate}
        transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-[16px] text-slate-500 mb-10"
      >
        Read the theory, then practice with questions from that topic.
      </motion.p>

      {/* Topic grid */}
      <motion.div
        {...fadeUp}
        animate={fadeUp.animate}
        transition={{ delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {topics.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[76px] bg-slate-100 rounded-2xl animate-pulse" />
            ))
          : topics.map(t => (
              <button
                key={t.name}
                onClick={() => onChoose(t)}
                className="group flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-violet-400 hover:shadow-[0_4px_16px_rgba(139,92,246,0.12)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <div>
                  <div className="text-[15px] font-bold text-slate-900 leading-snug">{t.name}</div>
                  <div className="text-[12px] text-slate-400 mt-0.5 font-medium">Theory + Practice</div>
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="text-slate-300 group-hover:text-violet-500 transition-colors flex-shrink-0"
                />
              </button>
            ))}
      </motion.div>
    </motion.div>
  );
}

// ── Theory Screen ─────────────────────────────────────────────────────────────

function TheoryScreen({
  topic,
  onBack,
  onStart,
}: {
  topic: Topic;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <motion.div
      className="min-h-[100dvh] px-6 py-14 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors mb-10"
      >
        <ArrowLeft size={14} weight="bold" />
        All Topics
      </button>

      {/* Topic badge */}
      <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-[11px] font-black tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-6">
        <BookOpen size={13} weight="bold" />
        Theory
      </div>

      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.025em] text-slate-900 mb-8">
        {topic.name}
      </h1>

      {/* Theory card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] mb-8">
        <div
          className="expl-body text-[15px] leading-[1.85] text-slate-600 [&_strong]:text-slate-900 [&_strong]:font-bold [&_em]:text-slate-700 [&_em]:not-italic [&_em]:font-medium"
          dangerouslySetInnerHTML={{ __html: topic.theory_html }}
        />
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2.5 bg-violet-600 text-white font-semibold text-[16px] px-8 py-[18px] rounded-2xl transition-all duration-200 hover:bg-violet-700 hover:-translate-y-0.5 active:scale-[0.97] group"
      >
        Start Practicing
        <ArrowRight
          size={18}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────

function QuizScreen({
  topic,
  question,
  answered,
  score,
  loading,
  onPick,
  onNext,
  onEnd,
}: {
  topic: Topic;
  question: Question | null;
  answered: number | null;
  score: { correct: number; total: number };
  loading: boolean;
  onPick: (i: number) => void;
  onNext: () => void;
  onEnd: () => void;
}) {
  const isAnswered = answered !== null;
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <motion.div
      className="flex flex-col items-center min-h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* Header */}
      <div className="w-full max-w-2xl px-6 pt-9 flex items-center gap-4">
        <button
          onClick={onEnd}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          End
        </button>

        <div className="flex-1" />

        <span className="hidden sm:block text-[11px] font-black text-violet-700 bg-violet-50 px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
          {topic.name}
        </span>

        {/* Score */}
        {score.total > 0 && (
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <Trophy size={13} weight="fill" className="text-amber-400" />
            <span className="text-[13px] font-black text-slate-700">
              {score.correct}/{score.total}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{pct}%</span>
          </div>
        )}
      </div>

      {/* Question area */}
      <div className="flex-1 w-full max-w-2xl px-6 py-7 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </motion.div>
          ) : question ? (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.07)]">
                <div className="text-[11px] font-black text-slate-400 tracking-[0.1em] uppercase mb-3">
                  Question {score.total + (isAnswered ? 0 : 1)}
                </div>
                <p className="text-[20px] sm:text-[21px] font-semibold text-slate-900 leading-snug tracking-[-0.01em] mb-8">
                  {question.q}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {question.opts.map((opt, i) => {
                    const isCorrectOpt = i === question.ans;
                    const isSelectedWrong = isAnswered && i === answered && !isCorrectOpt;

                    let btnCls =
                      'w-full flex items-center gap-4 px-5 py-4 border-[1.5px] rounded-2xl text-left text-[15px] font-medium text-slate-900 leading-snug transition-all duration-200 ';
                    if (!isAnswered) {
                      btnCls += 'border-slate-200 bg-slate-50 cursor-pointer hover:border-violet-400 hover:bg-violet-50 hover:translate-x-1 active:scale-[0.99]';
                    } else if (isCorrectOpt) {
                      btnCls += 'border-emerald-500 bg-emerald-50 cursor-default';
                    } else if (isSelectedWrong) {
                      btnCls += 'border-red-400 bg-red-50 cursor-default';
                    } else {
                      btnCls += 'border-slate-200 bg-slate-50 cursor-default opacity-60';
                    }

                    let letterCls =
                      'flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[9px] text-[13px] font-black transition-colors duration-200 ';
                    if (!isAnswered) {
                      letterCls += 'bg-slate-200 text-slate-600';
                    } else if (isCorrectOpt) {
                      letterCls += 'bg-emerald-500 text-white';
                    } else if (isSelectedWrong) {
                      letterCls += 'bg-red-500 text-white';
                    } else {
                      letterCls += 'bg-slate-200 text-slate-500';
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => onPick(i)}
                        className={btnCls}
                      >
                        <span className={letterCls}>{LETTERS[i]}</span>
                        <span className="flex-1">{opt}</span>
                        {isAnswered && isCorrectOpt && (
                          <CheckCircle size={20} weight="fill" className="text-emerald-500 flex-shrink-0" />
                        )}
                        {isSelectedWrong && (
                          <XCircle size={20} weight="fill" className="text-red-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Immediate explanation */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6"
                    >
                      {/* Result banner */}
                      <div
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-[14px] font-semibold mb-4 ${
                          answered === question.ans
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {answered === question.ans ? (
                          <><CheckCircle size={17} weight="fill" /> Correct!</>
                        ) : (
                          <><XCircle size={17} weight="fill" /> Incorrect — correct answer is {LETTERS[question.ans]}.</>
                        )}
                      </div>

                      {/* Theory explanation */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5">
                        <div className="text-[10px] font-black text-slate-400 tracking-[0.1em] uppercase mb-3">
                          Explanation
                        </div>
                        <div
                          className="expl-body text-[14px] leading-[1.8] text-slate-500 [&_strong]:text-slate-900 [&_strong]:font-bold"
                          dangerouslySetInnerHTML={{ __html: question.expl }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-slate-400"
            >
              No questions found for this topic yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <div className="w-full max-w-2xl px-6 pb-11 flex items-center justify-between gap-3">
        <button
          onClick={onEnd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-[1.5px] border-slate-200 bg-white font-semibold text-[14px] text-slate-600 transition-all duration-200 hover:border-slate-400 active:scale-[0.97]"
        >
          <ArrowCounterClockwise size={15} weight="bold" />
          Change Topic
        </button>

        {isAnswered && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-violet-600 text-white font-semibold text-[15px] transition-all duration-200 hover:bg-violet-700 hover:-translate-y-0.5 active:scale-[0.97] group"
          >
            Next Question
            <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
