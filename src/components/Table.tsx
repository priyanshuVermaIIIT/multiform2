'use client';
import React, { useState } from 'react';
import { User } from '../redux/userSlice'; 
import ConfirmationModal from './Modal';
import { calculateAge } from '@/utils/helper';
import ImagePreviewModal from './ImagePreview';

interface TableProps {
  users: User[]; 
  handleEditUser: (userId: string) => void;
  handleDeleteUser: (userId: string) => void;
  disabled: boolean; 
}

const Table: React.FC<TableProps> = ({ users, handleEditUser, handleDeleteUser, disabled }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [image, setImage] = useState('');
  const [dltUserId, setDltUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Sorting state
  const [isAscending, setIsAscending] = useState(true);

  // Handle sorting
  const sortedUsers = [...users].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return isAscending ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return isAscending ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="mt-4">
      <h2 className="font-semibold">Users List</h2>

      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search by Name, Email, or Phone"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <span>Name</span>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={!isAscending}
                    onChange={() => setIsAscending(!isAscending)}
                    title="Toggle Sorting"
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">DOB</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Interest</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Summary</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.dob}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{calculateAge(user.dob)}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.interest}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.fatherName}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => { setShowImgModal(true); setImage(user.file); }}
                      disabled={disabled}
                      className="px-4 py-2 text-black rounded-lg transition duration-200"
                    >
                      SHOW IMAGE
                    </button>
                  </div>
                </td>
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
                      onClick={() => { setDltUserId(user.id); setShowModal(true); }}
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

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ImagePreviewModal imageSrc={image} isOpen={showImgModal} onClose={() => { setShowImgModal(false); }} />
      <ConfirmationModal
        isOpen={showModal}
        title={"Are you sure brother?"}
        message={"Do you want to delete this User?"}
        confirmText={"Delete"}
        cancelText={"Cancel"}
        onConfirm={() => { handleDeleteUser(dltUserId); setShowModal(false); }}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default Table;
