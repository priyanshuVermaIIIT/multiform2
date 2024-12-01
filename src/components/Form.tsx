import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FormState } from "../redux/formSlice";
import { addUser, editUser, deleteUser } from "../redux/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import Table from "./Table";
import { checkAllFromisValid, validateSingleField } from "../utils/validations";
import ConfirmationModal from "./Modal";

const Form: React.FC = () => {
  const form = useSelector((state: RootState) => state.form);
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch: AppDispatch = useDispatch();

  const [editId, setEditId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); //key is field and value is error message
  const [userForms, setUserForms] = useState<FormState[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [dltFormIndex, setDltFormIndex] = useState(0);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formIndex, setFormIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers: any = localStorage.getItem("users");
      const storedDeletedUsers = localStorage.getItem("deletedUsers");

      if (storedUsers && users.length===0) {
        const usersFromLocalStorage = JSON.parse(storedUsers);
        usersFromLocalStorage.forEach((user: any) => {
          dispatch(addUser(user));
        });
      }
    }
  }, []);
  const handleInputChange = async (
    field: keyof FormState,
    value: string | File,
    formIndex: number
  ) => {
    if (field !== "file") {
      const updatedForms = [...userForms];
      const currentError = validateSingleField(field, value as string);
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        [field]: value,
        error: {
          ...errors,
          [field]: currentError,
        },
      };
      console.log("value",typeof value)
      setUserForms(updatedForms);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: currentError,
      }));
    } else {
      if (value instanceof File) {
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (value.size > maxSizeInBytes) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "File size must be less than 2 MB.",
          }));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          const currentError = validateSingleField(field, base64String);
          const updatedForms = [...userForms];
          updatedForms[formIndex] = {
            ...updatedForms[formIndex],
            [field]: base64String,
            error: {
              [field]: currentError,
            },
          };
          console.log("updatedformIndex", updatedForms);
          setUserForms(updatedForms);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
          }));
        };

        reader.onerror = () => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "Error reading the file. Please try again.",
          }));
        };

        reader.readAsDataURL(value);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Invalid file input.",
        }));
      }
    }
  };

  //save the edited user
  const handleSave = (): void => {
    // console.log("Starting handleSave...");
    const currentForm = userForms.find((item: any) => item.id === editId);
    // console.log(currentForm);
    if (checkAllFromisValid(userForms, true)) {
      // console.log("Validation failed. Stopping execution.");
      return;
    }
    if (editId) {
      // console.log("Editing form with ID:", editId);
      dispatch(
        editUser({
          id: editId || "",
          name: currentForm?.name || "",
          email: currentForm?.email || "",
          phone: currentForm?.phone || "",
          gender: currentForm?.gender || "",
          dob: currentForm?.dob || "",
          fatherName: currentForm?.fatherName || "",
          interest: currentForm?.interest || "",
          file: currentForm?.file
        })
      );
      // console.log("Dispatched edit action for:", currentForm);

      setEditId(null);
      // console.log("Edit ID reset.");

      setIsEdit(false);
      // console.log("Exited edit mode.");

      setUserForms([]);
      // console.log("User forms cleared.");
    }
  };

  //adding a new user form to the existing list of userForms
  // const handleAddMultipleUsers = () => {
  //   setUserForms([...userForms, form]);
  // };

  const handleAddMultipleUsers = (): void => {
    const updatedForm: FormState = {
      id: Date.now().toString(), // Generate a unique ID
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      fatherName: "",
      interest: "",
      file: "",
      error: {
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        fatherName: "",
        interest: "",
        file: "",
      },
    };
    setFile(null)
    setUserForms([...userForms, updatedForm]);
  };

  //for submitting all user forms at once
  const handleSubmitAll = (): void => {
    // console.log("Starting submission process...");
    // console.log("Current forms:", userForms);
    if (!checkAllFromisValid(userForms, false)) {
      // console.log("All forms are valid. Proceeding with submission...");
      userForms.forEach((formData: FormState) => {
        dispatch(addUser({ ...formData, id: Date.now().toString() }));
      });
      // console.log("All forms submitted successfully.");
      setUserForms([]);
    }
  };
  useEffect(() => {
    console.log("file", file);
    handleInputChange("file", file, formIndex);
  }, [file]);
  // for handling the editing of a specific user in the application
  const handleEditUser = (userId: string): void => {
    // console.log("Editing user with ID:", userId);
    setIsEdit(true);
    const userToEdit = users.find((user) => user.id === userId);
    // console.log("User found for editing:", userToEdit);
    if (userToEdit) {
      setEditId(userId);
      // console.log("Set editId to:", userId);
      const updatedForms: FormState[] = [...userForms];
      // console.log("Cloned userForms:", updatedForms);
      updatedForms[0] = {
        id: userToEdit.id,
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
        gender: userToEdit.gender,
        dob: userToEdit.dob,
        fatherName: userToEdit.fatherName,
        interest: userToEdit.interest,
        file: "",
        error: {
          name: "",
          email: "",
          phone: "",
          gender: "",
          dob: "",
          fatherName: "",
          interest: "",
          file: "",
        }, // Default empty errors
      };

      // console.log("Updated form with user data:", updatedForms);
      setUserForms(updatedForms);
    }
  };

  const handleDeleteForm = (formIndex: number): void => {
    const updatedForms = userForms.filter((_, index) => index !== formIndex);
    setUserForms(updatedForms);
    setShowModal(false)
  };
  const handleDeleteUser = (userId: string): void => {
    const dltUser = users.find((item:any)=>item.id===userId)
    dispatch(deleteUser(userId));
    const storedDltUsers = JSON.parse(localStorage.getItem("deletedUsers") || "[]")
localStorage.setItem( "deletedUsers",JSON.stringify([...storedDltUsers, dltUser]))


  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Form</h1>

      {userForms.map((currentForm, index) => (
        <div key={index} className="border p-4 rounded mb-4 bg-gray-100">
          <h2 className="font-semibold mb-4">
            {index === 0 ? "Add User" : `Add User ${index + 1}`}
          </h2>

          <div className="mb-2 relative">
            <label>Name:</label>
            <input
              type="text"
              value={currentForm.name}
              onChange={(e) => handleInputChange("name", e.target.value, index)}
              className="border rounded px-2 py-1 w-full"
            />
            {currentForm.error && currentForm.error.name && (
              <span className="text-red-500 ">{currentForm.error.name}</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Email:</label>
            <input
              type="email"
              value={currentForm.email}
              onChange={(e) =>
                handleInputChange("email", e.target.value, index)
              }
              className="border rounded px-2 py-1 w-full"
            />
            {currentForm.error && currentForm.error.email && (
              <span className="text-red-500 ">{currentForm.error.email}</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Phone:</label>
            <input
              type="text"
              value={currentForm.phone}
              onChange={(e) =>
                handleInputChange("phone", e.target.value, index)
              }
              className="border rounded px-2 py-1 w-full"
            />
            {currentForm.error && currentForm.error.phone && (
              <span className="text-red-500">{currentForm.error.phone}</span>
            )}
          </div>
          <div className="mb-2 relative">
            <label>Image:</label>
            <label className="border rounded px-2 py-1 w-full flex items-center">
    <span>{file ? file.name : "No file chosen"}</span>
    <input
      type="file"
      onChange={(e) => {
        const selectedFile = e.target.files && e.target.files[0];
        setFile(selectedFile); // Update file in state
        setFormIndex(index); // Update form index
      }}
      className="hidden" // Hide the file input field
    />
  </label>
            {currentForm.error && currentForm.error.file && (
              <span className="text-red-500">{currentForm.error.file}</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Gender:</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentForm.gender === "male"}
                  onChange={(e) =>
                    handleInputChange(
                      "gender",
                      e.target.checked ? "male" : "",
                      index
                    )
                  }
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentForm.gender === "female"}
                  onChange={(e) =>
                    handleInputChange(
                      "gender",
                      e.target.checked ? "female" : "",
                      index
                    )
                  }
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {currentForm.error && currentForm.error.gender && (
              <span className="text-red-500">{currentForm.error.gender}</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={currentForm.dob}
              onChange={(e) => handleInputChange("dob", e.target.value, index)}
              className="border rounded px-2 py-1 w-full"
              max={new Date().toISOString().split("T")[0]}
            />
            {currentForm.error && currentForm.error.dob && (
              <span className="text-red-500 ">{currentForm.error.dob}</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Summary:</label>
            <textarea
              value={currentForm.fatherName}
              onChange={(e) =>
                handleInputChange("fatherName", e.target.value, index)
              }
              className="border rounded px-2 py-1 w-full"
              rows={5} 
            />
            {currentForm.error && currentForm.error.fatherName && (
              <span className="text-red-500">
                {currentForm.error.fatherName}
              </span>
            )}
          </div>

          <div className="mb-2 relative">
            <label>Interest:</label>
            <select
              value={currentForm.interest}
              onChange={(e) =>
                handleInputChange("interest", e.target.value, index)
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select interest</option>
              <option value="science">Science</option>
              <option value="math">Math</option>
              <option value="literature">Literature</option>
            </select>
            {currentForm.error && currentForm.error.interest && (
              <span className="text-red-500 ">
                {currentForm.error.interest}
              </span>
            )}
          </div>

          <div className="flex  mt-4">
            <button
              onClick={() => {
                setDltFormIndex(index), setShowModal(true);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded "
            >
              Delete Form
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={handleAddMultipleUsers}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={checkAllFromisValid(userForms,false) || isEdit}
        >
          Add User
        </button>
        <button
          onClick={isEdit ? handleSave : handleSubmitAll}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          disabled={checkAllFromisValid(userForms, isEdit)}
        >
          {isEdit ? "Update User" : "Submit Users"}
        </button>
      </div>

      <Table
        users={users}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
        disabled={userForms.length > 0}
      />
      <ConfirmationModal
        isOpen={showModal}
        title={"Are you sure brother?"}
        message={"Do you want to delete this form ?"}
        confirmText={"Delete"}
        cancelText={"Cancel"}
        onConfirm={()=>{handleDeleteForm(dltFormIndex)}}
        onCancel={()=>setShowModal(false)}
      />
    </div>
  );
};

export default Form;
