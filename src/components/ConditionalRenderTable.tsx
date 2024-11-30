// ConditionalRenderTable.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from './Table'; // Assuming the Table component is imported
import FormComponent from '../components/Form'; // Your form component

const ConditionalRenderTable: React.FC = () => {
  const location = useLocation();
  const isFormRoute = location.pathname === "/form-route"; // Change this to your actual form route

    function handleEditUser(userId: string): void {
        throw new Error('Function not implemented.');
    }
    function handleDeleteUser(userId:string):void{
        throw new Error('function not implected')
    }

  return (
    <>
      {isFormRoute ? (
        <FormComponent /> // Render your form component here
      ) : (
        <Table users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} disabled={disabled} />
      )}
    </>
  );
};

export default ConditionalRenderTable;
