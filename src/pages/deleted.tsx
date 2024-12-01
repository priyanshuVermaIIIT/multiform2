'use client';

import React, { useEffect, useState } from 'react';

const Deleted = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const deletedUsers = localStorage.getItem("deletedUsers");
      if (deletedUsers) {
        setUsers(JSON.parse(deletedUsers));
      }
    }
  }, []);

  const handleRestore = (item: any) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedDeletedUsers = users.filter((i: any) => i.id !== item.id);
    setUsers(updatedDeletedUsers);

    localStorage.setItem("deletedUsers", JSON.stringify(updatedDeletedUsers));
    localStorage.setItem("users", JSON.stringify([...storedUsers, item]));
  };

    
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
            {users.map((user: any) => (
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
                      onClick={() => handleRestore(user)}
                   
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      Restore
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

export default Deleted;