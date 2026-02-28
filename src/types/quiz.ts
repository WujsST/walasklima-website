export type QuizType = 'home' | 'auto' | 'portable' | 'dehumidify';

export interface QuizAnswers {
  [key: string]: string;
}

export interface QuizSubmission {
  quiz_type: QuizType;
  answers: QuizAnswers;
  name: string;
  phone: string;
  email: string;
  company?: string;
  notes?: string;
}

export interface QuizSubmissionResponse {
  success: boolean;
  error?: string;
  id?: string;
}
