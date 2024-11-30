//  This function is responsible for validating a single field of the form.

import { FormState, UserFormArray } from "../redux/formSlice";

export const validateSingleField = (
  field: keyof FormState,
  value: string | any // Allow both string and File types
): string => {
  switch (field) {
    case "name":
      if (!value.trim() || !/^[a-zA-Z\s]+$/.test(value)) {
        return "Name must contain only alphabets.";
      }
      return "";
    case "email":
      if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
        return "Please enter a valid email.";
      }
      return "";
    case "phone":
      if (!value.trim() || !/^\d{10}$/.test(value)) {
        return "Phone number must be 10 digits.";
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
        if (value.size > maxSizeInBytes) {
          return "File size must be less than 2 MB.";
        }
        return "";
      }
      return "Invalid file input.";
    default:
      return "";
  }
};


//   This function checks if the entire form array is valid.

export const checkAllFromisValid = (arr: UserFormArray): boolean => {
  // console.log("Validating the entire form array.");

  const valid = arr.every((item: FormState) => {
    const { dob, email, fatherName, gender, interest, name, phone, error } =
      item;

    //   Conditions for a Valid Form:
    // All field values are non-empty (e.g., dob !== "").
    // All error messages are empty strings (e.g., error.dob === "").

    if (
      dob !== "" &&
      email !== "" &&
      // (fatherName === undefined) &&
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

  // If all forms are valid, !valid returns false (no validation issues).
  //     If any form is invalid, !valid returns true (validation issues exist).
  return !valid;
};
