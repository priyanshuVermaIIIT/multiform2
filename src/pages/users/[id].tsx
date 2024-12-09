import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { addUser } from '@/redux/userSlice';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users); 

  // Rehydrate users from localStorage on page load (if not already in state)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      storedUsers.forEach((user: any) => dispatch(addUser(user)));
    }
  }, [dispatch]);

  // Handle the case where `id` is undefined
  if (!id) {
    return <p className="text-gray-500">Loading...</p>;
  }

  const user = users.find((user) => user.id === String(id));

  if (!user) {
    return <p className="text-red-500">User not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">User Details</h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-700"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg text-gray-700"><strong>Date of Birth:</strong> {user.dob}</p>
        <p className="text-lg text-gray-700"><strong>Gender:</strong> {user.gender}</p>
        <p className="text-lg text-gray-700"><strong>Phone:</strong> {user.phone}</p>
        <p className="text-lg text-gray-700"><strong>Interests:</strong> {user.interest}</p>
        <p className="text-lg text-gray-700"><strong>Father's Name:</strong> {user.fatherName}</p>

        {user.file && (
          <div className="flex justify-center mt-4">
            <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={user.file} 
                alt={user.name} 
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
