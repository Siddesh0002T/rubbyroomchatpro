import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../utils/helper';
import SetUsernameModal from '../components/SetUsernameModal';

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const username = getUsername();
    if (!username) {
      setShowModal(true);
    }
  }, []);

  const handleCreateRoom = () => {
    const username = getUsername();
    if (!username) {
      setShowModal(true);
      return;
    }

    if (roomName.trim() === '') {
      alert('Please enter a room name');
      return;
    }

    // Navigate to room with room name
    navigate(`/room/${roomName}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      {/* Set Username Modal */}
      {showModal && <SetUsernameModal onClose={() => setShowModal(false)} />}

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
