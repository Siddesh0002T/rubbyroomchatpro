import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetUsernamePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the username submission logic (e.g., save to context or state)
    console.log('Username set to:', username);
    navigate('/'); // Navigate to the home or another page after setting the username
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Set Your Username</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-[#e81cff] text-white font-medium text-lg md:text-xl py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SetUsernamePage;