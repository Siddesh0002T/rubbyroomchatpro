import React from 'react';

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  // You can pull username from your helper if you like:
  // import { getUsername } from '../utils/helper';
  // const username = getUsername();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg p-6 w-11/12 max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-semibold">
            Your Profile
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl text-white">
            {/* You could inject initials here or an <img> avatar */}
            U
          </div>
          <p className="text-white font-medium">Username: <span className="text-primary">{/*username*/}</span></p>
          {/* add more profile info or actions here */}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;