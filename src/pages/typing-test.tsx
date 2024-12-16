// pages/typing-text.tsx
import React from 'react';
import TypingComponent from '../components/TypingTest';

const TypingTextPage = () => {
  return (
    <div className="min-h-screen bg-white text-blue-50 flex flex-col items-center mt-48 ">
     
      <div className="mt-6 w-full p-4">
        <TypingComponent />
      </div>
    </div>
  );
};

export default TypingTextPage;
