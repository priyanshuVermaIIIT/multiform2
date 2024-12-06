
import { FormState, UserFormArray } from "../redux/formSlice";

export const validateSingleField = (
  field: keyof FormState,
  value: string | any 
): string => {
  
  
  switch (field) {
    case "name":
     
      if (!value.trim() || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(value)) {
        return "Name must contain only alphabets and single spaces between words.";
      }
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters long.";
      }
      return "";
      case "email":
        if (
          !value.trim() ||
          !/^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/.test(value)
        ) {
          return "Please enter a valid email with at least 2 characters before '@', 2 characters in domain, and a valid extension.";
        }
        return "";
      case "phone":
        
        if (!value.trim() || !/^(\+91[-\s]?)?[6-9]\d{9}$/.test(value)) {
          return "Phone number must be valid and 10 digit";
        }
        return "";
    case "gender":
      if (!value) {
        return "Please select a gender.";
      }
      return "";
      case "dob":
        if (!value) {
          return "Date of birth is required.";
        }
      
        const today = new Date().toISOString().split("T")[0];
        const minDate = "1980-01-01"; 
      
        if (value > today) {
          return "Date of birth cannot be in the future.";
        }
      
        if (value < minDate) {
          return "Date of birth cannot be earlier than January 1, 1980.";
        }
      
        return ""; 
    case "fatherName":
      if (!value.trim()) {
        return "";
      }
      const wordCount = value.length;
      if (wordCount < 150) {
        return "Summary must be at least 150 words.";
      }
      if (wordCount > 250) {
        return "Summary must not exceed 250 words.";
      }
      return "";
    case "interest":
      if (!value) {
        return "Please select an interest.";
      }
      return "";
   case "file":
  if (value instanceof File) {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    const allowedTypes = ["image/jpeg", "image/png"]; 

    if (value.size > maxSizeInBytes) {
      return "File size must be less than 2 MB.";
    }
    if (!allowedTypes.includes(value.type)) {
      return "Only JPG and PNG file types are allowed.";
    }

    return ""; // Valid file
  }
  return "";
      
    default:
      return "";
  }
};



export const checkAllFromisValid = (arr: UserFormArray, isEdit:boolean): boolean => {
  const valid = arr.every((item: FormState) => {
    const { dob, email, fatherName, gender, interest, name, phone, error } =
      item;
      console.log("item____", item)
    if (
      dob !== "" &&
      email !== "" &&
      gender !== "" &&
      interest !== "" &&
      name !== "" &&
      phone !== "" &&
      error.dob === "" &&
      error.email === "" &&
      (error.fatherName === undefined || error.fatherName === "") &&
      error.gender === "" &&
      error.interest === "" &&
      error.name === "" &&
      error.phone === ""
    )
    return true;
    else {
     
      return false;
    }
  });
  
  return  !valid;
};
