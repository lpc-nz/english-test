'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  ArrowCounterClockwise,
  CheckCircle,
  XCircle,
  CaretDown,
  BookOpen,
  Clock,
  Globe,
} from '@phosphor-icons/react';
import { QS } from '@/data/questions';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

// ── Framer Motion variants ────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 64 : -64,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -64 : 64,
    opacity: 0,
    transition: { duration: 0.18 },
  }),
};

const fadeUp = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ── Main controller ───────────────────────────────────────────────────────────

export default function GrammarTest() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'results'>('start');
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(QS.length).fill(null));
  const [openCards, setOpenCards] = useState<boolean[]>(() => Array(QS.length).fill(false));

  const resetAndStart = () => {
    setCur(0);
    setDir(1);
    setAnswers(Array(QS.length).fill(null));
    setOpenCards(Array(QS.length).fill(false));
    setScreen('quiz');
  };

  const pickAnswer = (idx: number) => {
    if (answers[cur] !== null) return;
    setAnswers(a => a.map((v, i) => (i === cur ? idx : v)));
  };

  const goNext = () => {
    if (cur < QS.length - 1) {
      setDir(1);
      setCur(c => c + 1);
    } else {
      setScreen('results');
    }
  };

  const goPrev = () => {
    if (cur === 0) return;
    setDir(-1);
    setCur(c => c - 1);
  };

  const toggleCard = (i: number) => {
    setOpenCards(o => o.map((v, idx) => (idx === i ? !v : v)));
  };

  const correctCount = answers.filter((a, i) => a === QS[i].ans).length;
  const pct = Math.round((correctCount / QS.length) * 100);

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <StartSection key="start" onStart={resetAndStart} />
        )}
        {screen === 'quiz' && (
          <QuizSection
            key="quiz"
            cur={cur}
            dir={dir}
            answers={answers}
            onPick={pickAnswer}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
        {screen === 'results' && (
          <ResultsSection
            key="results"
            answers={answers}
            correctCount={correctCount}
            pct={pct}
            openCards={openCards}
            onToggle={toggleCard}
            onRetake={resetAndStart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Start Screen ──────────────────────────────────────────────────────────────

function StartSection({ onStart }: { onStart: () => void }) {
  const topics = [
    {
      icon: <Clock size={18} weight="bold" className="text-white" />,
      title: 'Tenses',
      sub: 'Present, Past, Perfect',
    },
    {
      icon: <BookOpen size={18} weight="bold" className="text-white" />,
      title: 'Modal Verbs',
      sub: 'Can, Must, Should, Would',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Subject-Verb Agreement',
      sub: 'Singular & Plural rules',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ),
      title: 'Conditionals & Passive',
      sub: 'Type 2, Modal Passive',
    },
    {
      icon: <Globe size={18} weight="bold" className="text-white" />,
      title: 'Gerunds & Infinitives',
      sub: 'Verb + -ing / to-V',
    },
  ];

  return (
    <motion.div
      className="flex min-h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* ── Left content ── */}
      <div className="flex flex-col justify-center px-10 py-20 lg:px-16 flex-1 lg:max-w-[600px]">
        <motion.div
          {...fadeUp}
          animate={{ ...fadeUp.animate }}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-[11px] font-black tracking-[0.08em] uppercase px-4 py-1.5 rounded-full w-fit mb-9"
        >
          <BookOpen size={13} weight="bold" />
          English Grammar
        </motion.div>

        <motion.h1
          {...fadeUp}
          animate={{ ...fadeUp.animate }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(44px,6vw,76px)] font-extrabold leading-none tracking-[-0.035em] mb-5 text-slate-900"
        >
          Test your<br />
          <span className="text-teal-600">grammar</span><br />
          skills.
        </motion.h1>

        <motion.p
          {...fadeUp}
          animate={{ ...fadeUp.animate }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17px] text-slate-500 leading-relaxed max-w-[460px] mb-12"
        >
          10 questions covering essential grammar rules. Answer each question and get a detailed explanation in Vietnamese to understand exactly why.
        </motion.p>

        <motion.div
          {...fadeUp}
          animate={{ ...fadeUp.animate }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-stretch mb-12"
        >
          {[
            { val: '10', lbl: 'Questions' },
            { val: '~5', lbl: 'Minutes' },
            { val: 'VI', lbl: 'Explanations' },
          ].map((m, i) => (
            <div
              key={m.lbl}
              className={`flex flex-col gap-1 pr-8 mr-8 ${i < 2 ? 'border-r border-slate-200' : ''}`}
            >
              <span className="text-[30px] font-extrabold tracking-tight text-slate-900">{m.val}</span>
              <span className="text-[12px] text-slate-400 font-medium">{m.lbl}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          {...fadeUp}
          animate={{ ...fadeUp.animate }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={onStart}
          className="inline-flex items-center gap-2.5 bg-slate-900 text-white font-semibold text-[16px] px-8 py-[18px] rounded-2xl w-fit transition-all duration-200 ease-out hover:bg-teal-600 hover:-translate-y-0.5 active:scale-[0.97] group"
        >
          Start Test
          <ArrowRight
            size={18}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.button>
      </div>

      {/* ── Right decorative panel ── */}
      <div className="hidden lg:flex w-[42%] bg-slate-950 items-center justify-center px-14 py-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative flex flex-col gap-3 w-full max-w-[340px]">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
                {t.icon}
              </div>
              <div>
                <div className="text-white font-bold text-[15px] leading-snug">{t.title}</div>
                <div className="text-white/55 text-[13px] mt-0.5">{t.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────

function QuizSection({
  cur,
  dir,
  answers,
  onPick,
  onNext,
  onPrev,
}: {
  cur: number;
  dir: number;
  answers: (number | null)[];
  onPick: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const q = QS[cur];
  const userAns = answers[cur];
  const isAnswered = userAns !== null;
  const isLast = cur === QS.length - 1;
  const progress = ((cur + 1) / QS.length) * 100;

  return (
    <motion.div
      className="flex flex-col items-center min-h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* Progress header */}
      <div className="w-full max-w-2xl px-6 pt-9 flex items-center gap-4">
        <span className="text-[13px] font-bold text-slate-400 whitespace-nowrap tracking-wide">
          Q <b className="text-slate-900">{cur + 1}</b> / {QS.length}
        </span>
        <div className="flex-1 h-[4px] bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-600 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          />
        </div>
        <span className="hidden sm:block text-[11px] font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
          {q.topic}
        </span>
      </div>

      {/* Carousel */}
      <div className="flex-1 w-full max-w-2xl px-6 py-7 flex flex-col justify-center">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cur}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.07)]">
                <div className="text-[11px] font-black text-slate-400 tracking-[0.1em] uppercase mb-3">
                  Question {String(cur + 1).padStart(2, '0')}
                </div>
                <p className="text-[20px] sm:text-[21px] font-semibold text-slate-900 leading-snug tracking-[-0.01em] mb-8">
                  {q.q}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {q.opts.map((opt, i) => {
                    const isCorrectOpt = i === q.ans;
                    const isSelectedWrong = isAnswered && i === userAns && !isCorrectOpt;

                    let btnCls =
                      'w-full flex items-center gap-4 px-5 py-4 border-[1.5px] rounded-2xl text-left text-[15px] font-medium text-slate-900 leading-snug transition-all duration-200 ';

                    if (!isAnswered) {
                      btnCls +=
                        'border-slate-200 bg-slate-50 cursor-pointer hover:border-teal-500 hover:bg-teal-50 hover:translate-x-1 active:scale-[0.99]';
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

                {/* Inline feedback */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`mt-5 flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-[14px] font-semibold ${
                        userAns === q.ans
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {userAns === q.ans ? (
                        <>
                          <CheckCircle size={17} weight="fill" />
                          Correct!
                        </>
                      ) : (
                        <>
                          <XCircle size={17} weight="fill" />
                          Incorrect — the correct answer is {LETTERS[q.ans]}.
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="w-full max-w-2xl px-6 pb-11 flex items-center justify-between gap-3">
        <button
          disabled={cur === 0}
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-[1.5px] border-slate-200 bg-white font-semibold text-[15px] text-slate-900 transition-all duration-200 hover:border-slate-900 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft size={17} weight="bold" />
          Previous
        </button>

        {/* Progress dots */}
        <div className="flex gap-1.5 items-center flex-wrap justify-center max-w-[200px]">
          {QS.map((q, i) => {
            let cls = 'h-[7px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 ';
            if (i === cur)                 cls += 'w-5 bg-teal-600';
            else if (answers[i] === q.ans) cls += 'w-[7px] bg-emerald-500';
            else if (answers[i] !== null)  cls += 'w-[7px] bg-red-400';
            else if (i < cur)              cls += 'w-[7px] bg-slate-400';
            else                           cls += 'w-[7px] bg-slate-200';
            return <div key={i} className={cls} />;
          })}
        </div>

        <button
          disabled={!isAnswered}
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-[1.5px] font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-30 disabled:pointer-events-none ${
            isLast
              ? 'bg-teal-600 border-teal-600 text-white hover:bg-teal-700 hover:border-teal-700'
              : 'bg-slate-900 border-slate-900 text-white hover:bg-teal-600 hover:border-teal-600'
          }`}
        >
          {isLast ? 'Submit' : 'Next'}
          {isLast ? (
            <CheckCircle size={17} weight="bold" />
          ) : (
            <ArrowRight size={17} weight="bold" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ── Results Screen ────────────────────────────────────────────────────────────

function ResultsSection({
  answers,
  correctCount,
  pct,
  openCards,
  onToggle,
  onRetake,
}: {
  answers: (number | null)[];
  correctCount: number;
  pct: number;
  openCards: boolean[];
  onToggle: (i: number) => void;
  onRetake: () => void;
}) {
  const wrongCount = QS.length - correctCount;

  const resultMsg = (
    [
      [100, 'Flawless — a perfect score!'],
      [80, 'Excellent work. You have a strong command of English grammar.'],
      [60, 'Good effort. Review the explanations below to fill the gaps.'],
      [40, 'Keep practicing — the explanations will help you improve.'],
      [0, "Don't give up. Study each explanation carefully and try again."],
    ] as [number, string][]
  ).find(([t]) => pct >= t)![1];

  return (
    <motion.div
      className="flex flex-col items-center min-h-[100dvh] py-16 px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      exit={{ opacity: 0 }}
    >
      {/* Score block */}
      <div className="w-full max-w-2xl mb-14">
        <div className="text-[11px] font-black text-slate-400 tracking-[0.1em] uppercase mb-4">
          Test Complete
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[clamp(72px,14vw,108px)] font-extrabold tracking-[-0.045em] leading-none text-slate-900">
            {correctCount}
          </span>
          <span className="text-4xl font-normal text-slate-400 tracking-tight">/ {QS.length}</span>
        </div>
        <p className="text-[18px] text-slate-500 font-medium mb-10 max-w-lg">{resultMsg}</p>

        <div className="flex items-stretch mb-11">
          {[
            { val: correctCount, cls: 'text-emerald-600', lbl: 'Correct' },
            { val: wrongCount, cls: 'text-red-600', lbl: 'Incorrect' },
            { val: `${pct}%`, cls: 'text-teal-600', lbl: 'Accuracy' },
          ].map((s, i) => (
            <div
              key={s.lbl}
              className={`flex flex-col gap-1 pr-8 mr-8 ${i < 2 ? 'border-r border-slate-200' : ''}`}
            >
              <span className={`text-[28px] font-extrabold tracking-tight ${s.cls}`}>{s.val}</span>
              <span className="text-[12px] text-slate-400 font-medium">{s.lbl}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border-[1.5px] border-slate-200 bg-white font-semibold text-[15px] text-slate-900 transition-all duration-200 hover:border-slate-900 hover:-translate-y-0.5 active:scale-[0.97]"
        >
          <ArrowCounterClockwise size={16} weight="bold" />
          Retake Test
        </button>
      </div>

      {/* Explanation accordion */}
      <div className="w-full max-w-2xl">
        <div className="text-[11px] font-black text-slate-400 tracking-[0.1em] uppercase mb-5">
          Review &amp; Explanations
        </div>
        <div className="flex flex-col gap-3">
          {QS.map((q, i) => {
            const isCorrect = answers[i] === q.ans;
            const isOpen = openCards[i];

            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-[18px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <button
                  onClick={() => onToggle(i)}
                  className="w-full flex items-center gap-3.5 px-6 py-5 text-left hover:bg-slate-50 transition-colors duration-150"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-[11px] font-black text-slate-400 tracking-[0.07em] uppercase min-w-[52px]">
                    Q{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-[14px] font-semibold text-slate-900 leading-snug">
                    {q.q}
                  </span>
                  <CaretDown
                    size={18}
                    weight="bold"
                    className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 border-t border-slate-100">
                        {/* Your answer vs correct */}
                        <div className="grid grid-cols-2 gap-5 py-4 border-b border-slate-100 mb-4">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 tracking-[0.1em] uppercase mb-1.5">
                              Your Answer
                            </div>
                            <div
                              className={`text-[14px] font-medium ${
                                isCorrect ? 'text-slate-700' : 'text-red-600'
                              }`}
                            >
                              {answers[i] !== null
                                ? `${LETTERS[answers[i]!]}. ${q.opts[answers[i]!]}`
                                : '—'}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-emerald-600 tracking-[0.1em] uppercase mb-1.5">
                              Correct Answer
                            </div>
                            <div className="text-[14px] font-medium text-slate-900">
                              {LETTERS[q.ans]}. {q.opts[q.ans]}
                            </div>
                          </div>
                        </div>

                        {/* Vietnamese explanation — static HTML, no user input */}
                        <div
                          className="expl-body text-[14px] leading-[1.8] text-slate-500 [&_strong]:text-slate-900 [&_strong]:font-bold"
                          dangerouslySetInnerHTML={{ __html: q.expl }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
