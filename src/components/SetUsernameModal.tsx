// components/SetUsernameModal.tsx
import { useState } from 'react';
import { setUsername } from '../utils/helper';

const SetUsernameModal = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');

  const handleSave = () => {
    if(input.trim() !== '') {
      setUsername(input);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-2">Set your Username</h2>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handleSave} className="bg-purple-500 mt-2 p-2 text-white w-full rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default SetUsernameModal;
