import React, { useState, useEffect } from 'react';
import { getUsername, setUsername } from '../utils/helper';

interface Props {
  onClose: () => void;
}

const ChangeUsernameModal: React.FC<Props> = ({ onClose }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const currentUsername = getUsername();
    if (currentUsername) {
      setInput(currentUsername);
    }
  }, []);

  const handleSave = () => {
    if (input.trim()) {
      setUsername(input.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xs shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Change Username</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter new username"
        />
        <button
          onClick={handleSave}
          className="bg-[#e81cff] text-white w-full py-2 rounded hover:bg-pink-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangeUsernameModal;
