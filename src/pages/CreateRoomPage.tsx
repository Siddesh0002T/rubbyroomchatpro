import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    if(roomName.trim() === '') {
      alert('Please enter a room name');
      return;
    }

    // For now, just navigate to chat room with the room name (you can change logic later)
    navigate(`/room/${roomName}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      {/* Heading */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">Create a Room</h1>

      {/* Room Name Input */}
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="w-full max-w-sm bg-gray-800 text-white placeholder-gray-500 rounded-full py-3 px-6 mb-6 focus:outline-none focus:ring-2 focus:ring-[#e81cff]"
      />

      {/* Create Room Button */}
      <button
        onClick={handleCreateRoom}
        className="bg-[#e81cff] text-white font-medium text-lg py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoomPage;
