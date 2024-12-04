export type Problem = {
  pid?: number;
  name: string;
  difficulty: number;
  description: string;
  memory_limit: number;
  time_limit: number;
  category: string;
  testcases: Testcase[];
  restricted: number;
};

export type UpdateProblem = {
  id: string;
  pid: number;
  name: string;
  difficulty: number;
  description: string;
  memory_limit: number;
  time_limit: number;
  category: string;
  testcases: Testcase[];
  restricted: number;
};

export type Testcase = {
  input: string;
  output: string;
  show_user: boolean;
};

export type ProblemSummary = {
  id: string;
  pid: number;
  difficulty: number;
  title: string;
  description: string;
  category: string;
};

export type TestcaseGroup = {
  [key: number]: { input: string; output: string };
};

export const Ranks: { [key: number]: string } = {
  0: "<span style='color: #A0A0A0'>I1</span>",
  1: "<span style='color: #A0A0A0'>I2</span>",
  2: "<span style='color: #A0A0A0'>I3</span>",
  3: "<span style='color: #A0A0A0'>I4</span>",
  4: "<span style='color: #A0A0A0'>I5</span>",
  5: "<span style='color: #975936'>B1</span>",
  6: "<span style='color: #975936'>B2</span>",
  7: "<span style='color: #975936'>B3</span>",
  8: "<span style='color: #975936'>B4</span>",
  9: "<span style='color: #975936'>B5</span>",
  10: "<span style='color: #C0C0C0'>S1</span>",
  11: "<span style='color: #C0C0C0'>S2</span>",
  12: "<span style='color: #C0C0C0'>S3</span>",
  13: "<span style='color: #C0C0C0'>S4</span>",
  14: "<span style='color: #C0C0C0'>S5</span>",
  15: "<span style='color: #D99207'>G1</span>",
  16: "<span style='color: #D99207'>G2</span>",
  17: "<span style='color: #D99207'>G3</span>",
  18: "<span style='color: #D99207'>G4</span>",
  19: "<span style='color: #D99207'>G5</span>",
  20: "<span style='color: #07C0D9'>P1</span>",
  21: "<span style='color: #07C0D9'>P2</span>",
  22: "<span style='color: #07C0D9'>P3</span>",
  23: "<span style='color: #07C0D9'>P4</span>",
  24: "<span style='color: #07C0D9'>P5</span>",
  25: "<span style='color: #9902B2'>D1</span>",
  26: "<span style='color: #9902B2'>D2</span>",
  27: "<span style='color: #9902B2'>D3</span>",
  28: "<span style='color: #9902B2'>D4</span>",
  29: "<span style='color: #9902B2'>D5</span>",
  30: "<span style='color: #02B50A'>E1</span>",
  31: "<span style='color: #02B50A'>E2</span>",
  32: "<span style='color: #02B50A'>E3</span>",
  33: "<span style='color: #02B50A'>E4</span>",
  34: "<span style='color: #02B50A'>E5</span>",
  35: "<span style='color: #DA092F'>C1</span>",
  36: "<span style='color: #DA092F'>C2</span>",
  37: "<span style='color: #DA092F'>C3</span>",
  38: "<span style='color: #DA092F'>C4</span>",
  39: "<span style='color: #DA092F'>C5</span>",
  40: "<span style='color: #4563EB'>L</span>",
};
