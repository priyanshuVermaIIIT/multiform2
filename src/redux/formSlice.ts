import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  fatherName: string;
  interest: string;
  file:any,
  error:{
    name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  fatherName: string;
  interest: string;
  file:any
  }
}




export type UserFormArray = FormState[];

const initialState: FormState = {
  id: Date.now().toString(),
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  fatherName: "",
  interest: "",
  file:"",
  error: {dob:'', email:'' ,fatherName:"" ,gender:"", interest:"" , name:"" , phone:"" ,file: "" } 
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => {
      return { ...initialState };
    },
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
