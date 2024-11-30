import React, { use } from 'react';
import { restoreUser} from '../redux/userSlice'; // Import the User interface
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "../redux/store"


const Deleted: React.FC = () => {
    const users = useSelector((state: RootState) => state.user.deletedUsers);
    console.log(users);
    const dispatch: AppDispatch = useDispatch();

    
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
                      onClick={() => dispatch(restoreUser(user.id))}
                   
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