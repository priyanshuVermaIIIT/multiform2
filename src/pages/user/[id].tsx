'use client';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { User } from '../../redux/userSlice'; // Adjust the path based on your folder structure
import { calculateAge } from '@/utils/helper';

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic ID from the URL
  const users = useSelector((state: any) => state.users); // Replace with your Redux selector
  const user = users.find((u: User) => u.id === id); // Find the user by ID

  if (!user) {
    return <p>User not found!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>DOB:</strong> {user.dob}</p>
      <p><strong>Age:</strong> {calculateAge(user.dob)}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Interest:</strong> {user.interest}</p>
      <p><strong>Summary:</strong> {user.fatherName}</p>
      {user.file && (
        <img src={user.file} alt={`${user.name}'s image`} className="w-32 h-32 rounded-full mt-4" />
      )}
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Back
      </button>
    </div>
  );
};

export default UserDetails;
