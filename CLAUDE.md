# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Architecture

Single-page Next.js 15 app (App Router, no routing — all state is client-side).

```
app/
  layout.tsx        Server component — Outfit font (next/font/google), metadata
  page.tsx          Server component — renders <GrammarTest />
  globals.css       Tailwind directives + .expl-body .tag styles for explanation HTML

components/
  GrammarTest.tsx   'use client' — entire quiz lives here (3 inline sections below)
    StartSection    Asymmetric split: left content / right dark topic panel
    QuizSection     Framer Motion AnimatePresence carousel; one question per slide
    ResultsSection  Score display + AnimatePresence accordion for explanations

data/
  questions.ts      QS array — 10 questions with Vietnamese HTML explanations

types/
  quiz.ts           Question and Screen types
```

## Key patterns

**Carousel animation** — `AnimatePresence mode="wait"` keyed by `cur` index. The `slideVariants` object uses a `custom` prop (`dir: 1 | -1`) to determine slide direction. The `type: 'spring' as const` cast is required to satisfy Framer Motion's `Variants` type in TypeScript strict mode.

**Quiz state** — all state lives in `GrammarTest` and is passed down as props. No context, no Zustand. State: `cur` (current index), `dir` (slide direction), `answers` (nullable index array), `openCards` (accordion open state).

**Explanation HTML** — `dangerouslySetInnerHTML` is used in `ResultsSection` for `q.expl`. Content is safe: it's static data in `data/questions.ts`, not user input. The `.tag` class is styled in `globals.css`.

## Adding questions

Edit `data/questions.ts`. Each entry shape:
```ts
{
  q:    "Question text",
  opts: ["A text", "B text", "C text", "D text"],  // exactly 4
  ans:  1,        // 0-based index of correct option
  topic: "Badge label",
  expl: `<span class="tag">Topic tag</span><strong>Explanation...</strong>`,
}
```

`QS.length` drives all counters automatically — no hardcoded "10".

## Stack

- **Next.js 15** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v3** — `font-sans` maps to Outfit via CSS variable `--font-outfit`
- **Framer Motion v12** — carousel slides + accordion + screen fade transitions
- **@phosphor-icons/react v2** — all icons (`weight="bold"` for nav, `weight="fill"` for status)
