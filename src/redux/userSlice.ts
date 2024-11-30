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
      state.users.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(state.users));
        }
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload);
      if (userIndex !== -1) {
        const [deletedUser] = state.users.splice(userIndex, 1);
        state.deletedUsers.push(deletedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(state.users));
          localStorage.setItem("deletedUsers", JSON.stringify(state.deletedUsers));
        }
      }
    },
    restoreUser: (state, action: PayloadAction<string>) => {
      const deletedUserIndex = state.deletedUsers.findIndex((user) => user.id === action.payload);
      if (deletedUserIndex !== -1) {
        const [restoredUser] = state.deletedUsers.splice(deletedUserIndex, 1);
        state.users.push(restoredUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(state.users));
          localStorage.setItem("deletedUsers", JSON.stringify(state.deletedUsers));
        }
      }
    },
  },
});

export const { addUser, editUser, deleteUser, restoreUser } = userSlice.actions;
export default userSlice.reducer;
