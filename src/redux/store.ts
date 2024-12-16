import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import userReducer from "./userSlice";
import typingReducer from "./typingSlice"; 
import quizReducer from "./quizSlice"


export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    typing: typingReducer, 
    quiz: quizReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




