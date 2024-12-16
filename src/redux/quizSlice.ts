import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  selectedAnswers: (string | null)[]; 
  score: number;
}

const initialState: QuizState = {
  questions: [],
  selectedAnswers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.selectedAnswers = Array(action.payload.length).fill(null); 
      state.score = 0; 
    },
    selectAnswer(
      state,
      action: PayloadAction<{ questionIndex: number; selectedAnswer: string }>
    ) {
      const { questionIndex, selectedAnswer } = action.payload;
      state.selectedAnswers[questionIndex] = selectedAnswer;
    },
    calculateScore(state) {
      state.score = state.questions.reduce((total, question, index) => {
        const userAnswer = state.selectedAnswers[index];
        if (userAnswer === question.correctAnswer) {
          return total + 2; 
        }else {
                return total - 1;
        }
        return total; 
      }, 0);
    },
  },
});

export const { setQuestions, selectAnswer, calculateScore } = quizSlice.actions;
export default quizSlice.reducer;
