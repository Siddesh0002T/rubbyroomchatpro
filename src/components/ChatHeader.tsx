import { ArrowLeft, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeUsernameModal from './ChangeUsernameModal';

const ChatHeader = ({ roomId }: { roomId: string }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => navigate('/create-room');

  return (
    <>
       <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-transparent px-4 py-3 flex items-center justify-between">
        {/* Back Button */}
        <button onClick={handleBack}>
          <ArrowLeft className="text-white" />
        </button>

        {/* Room ID */}
        <h1 className="text-white text-lg font-medium truncate">{roomId}</h1>

        {/* Profile Icon */}
        <button onClick={() => setShowModal(true)}>
          <UserCircle size={24} className="text-white opacity-80" />
        </button>
      </div>

      {/* Username Modal */}
      {showModal && <ChangeUsernameModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ChatHeader;
