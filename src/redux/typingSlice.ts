import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingState {
  text: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  errors: number;
}

const initialState: TypingState = {
  text: "This is a sample typing test paragraph.",
  userInput: "",
  startTime: null,
  endTime: null,
  errors: 0,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;

      // Count errors
      state.errors = state.text
        .substring(0, action.payload.length)
        .split("")
        .filter((char, i) => char !== action.payload[i]).length;
    },
    startTest: (state) => {
      state.startTime = Date.now();
      state.endTime = null;
      state.userInput = "";
      state.errors = 0;
    },
    endTest: (state) => {
      state.endTime = Date.now();
    },
  },
});

export const { setUserInput, startTest, endTest } = typingSlice.actions;
export default typingSlice.reducer;
