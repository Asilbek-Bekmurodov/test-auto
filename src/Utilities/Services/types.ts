// Utilities/Services/types.ts

export interface Question {
  id: number;
  question_id?: number;
  text: string;
  options?: string[];
  image_url?: string;
}

export interface StartTestResponse {
  session: {
    id: string;
  };
  type: string;
  duration: number;
  questions: Question[];
}
