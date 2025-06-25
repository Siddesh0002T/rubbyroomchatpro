// components/SetUsernameModal.tsx
import { useState } from 'react';
import { setUsername } from '../utils/helper';
import { X } from 'lucide-react';

const SetUsernameModal = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');

  const handleSave = () => {
    if (input.trim() !== '') {
      setUsername(input.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-4 text-center">Set Your Username</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a name"
          className="w-full px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#e81cff]"
        />
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-[#e81cff] hover:scale-105 transition transform text-white rounded-full py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SetUsernameModal;
