export interface Question {
  id: number;
  q: string;
  opts: [string, string, string, string];
  ans: 0 | 1 | 2 | 3;
  topic: string;
  expl: string; // safe HTML — static content only
  test_number?: number | null;
}

export type Screen = 'start' | 'quiz' | 'results';

export type TestId = 1 | 2 | 3 | 4;
