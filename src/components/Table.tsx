import React from 'react';
import { User } from '../redux/userSlice'; // Import the User interface

interface TableProps {
  users: User[]; 
  handleEditUser: (userId: string) => void;
  handleDeleteUser: (userId: string) => void;
  disabled: boolean; 
}

const Table: React.FC<TableProps> = ({ users, handleEditUser, handleDeleteUser, disabled }) => {
  return (
    <div className="mt-4">
      <h2 className="font-semibold">Users List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">DOB</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Interest</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Father's Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.dob}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.interest}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.fatherName}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      disabled={disabled}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={disabled}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
