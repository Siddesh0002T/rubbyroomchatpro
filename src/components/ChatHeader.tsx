import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ChangeUsernameModal from './ChangeUsernameModal';

const ChatHeader = ({ roomId }: { roomId: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBack = () => navigate('/create-room');

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${location.pathname}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500); // Auto-hide after 2.5s
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/30 px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        {/* Room ID */}
        <h1 className="text-white text-lg font-semibold truncate">{roomId}</h1>

        {/* Share & Profile Buttons */}
        <div className="flex items-center gap-3">
          {/* Share */}
          <button
            onClick={handleShare}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white font-bold transition"
          >
            🔗
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowModal(true)}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
          >
            <span className="text-white text-sm font-bold">U</span>
          </button>
        </div>
      </div>

      {/* Username Modal */}
      {showModal && <ChangeUsernameModal onClose={() => setShowModal(false)} />}

      {/* Toast Notification */}
    {showToast && (
  <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full shadow-lg text-sm z-50 animate-fade-in-out">
    Link copied! Invite friends to join this chat.
  </div>
)}

    </>
  );
};

export default ChatHeader;
