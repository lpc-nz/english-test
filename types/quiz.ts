export interface Question {
  q: string;
  opts: [string, string, string, string];
  ans: 0 | 1 | 2 | 3;
  topic: string;
  expl: string; // safe HTML — static content only
}

export type Screen = 'start' | 'quiz' | 'results';
