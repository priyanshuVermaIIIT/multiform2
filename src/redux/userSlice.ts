import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  fatherName: string;
  interest: string;
  file:string
}

interface UserState {
  users: User[];
  deletedUsers: User[];
}

const initialState: UserState = {
  users: [],
  deletedUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find((user) => user.id === action.payload.id);
  if (!existingUser) {
    // Add user only if it doesn't already exist
    state.users.push(action.payload);
    state.users.sort((a, b) => a.name.localeCompare(b.name));
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    }
  },
    editUser: (state, action: PayloadAction<User>) => {
      try {
          const index = state.users.findIndex((user) => user.id === action.payload.id);
  
          if (index !== -1) {
              state.users[index] = { ...state.users[index], ...action.payload };
              state.users.sort((a, b) => a.name.localeCompare(b.name));

              if (typeof window !== "undefined") {
                  localStorage.setItem("users", JSON.stringify(state.users));
              }
          }
      } catch (error) {
          console.error("Error updating user:", error);
      }
  },
    deleteUser: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload);
      if (userIndex !== -1) {
        const [deletedUser] = state.users.splice(userIndex, 1);
        state.deletedUsers.push(deletedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(state.users));
        }
      }
    },
   
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
