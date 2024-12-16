import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypingTestState {
  paragraph: string;
  typedText: string;
  timer: number;
  wpm: number;
  accuracy: number;
  isTestStarted: boolean;
  isTestCompleted: boolean;
}

const initialState: TypingTestState = {
  paragraph: '',
  typedText: '',
  timer: 0,
  wpm: 0,
  accuracy: 0,
  isTestStarted: false,
  isTestCompleted: false,
};

const typingSlice = createSlice({
  name: 'typingTest',
  initialState,
  reducers: {
    startTest(state, action: PayloadAction<string>) {
      state.paragraph = action.payload;
      state.typedText = '';
      state.timer = 0;
      state.wpm = 0;
      state.accuracy = 0;
      state.isTestStarted = true;
      state.isTestCompleted = false;
    },
    updateTypedText(state, action: PayloadAction<string>) {
      state.typedText = action.payload;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    calculateWPM(state) {
      const words = state.typedText.split(' ').length;
      const minutes = state.timer / 60;
      state.wpm = Math.round(words / minutes);
    },
    calculateAccuracy(state) {
      const correctChars = state.typedText.split('').filter((char, idx) => char === state.paragraph[idx]).length;
      state.accuracy = Math.round((correctChars / state.paragraph.length) * 100);
    },
    completeTest(state) {
      state.isTestCompleted = true;
    },
    resetTest(state) {
      state.isTestStarted = false;
      state.isTestCompleted = false;
      state.typedText = '';
      state.timer = 0;
      state.wpm = 0;
      state.accuracy = 0;
    },
  },
});

export const { startTest, updateTypedText, setTimer, calculateWPM, calculateAccuracy, completeTest, resetTest } = typingSlice.actions;
export default typingSlice.reducer;
