import React from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';

const ProRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ChatHeader roomId={roomId || 'Unknown'} />

      <div className="flex-1 overflow-y-auto p-4">
        {/* Replace this with ChatBody/ChatMessages component later */}
        <div className="text-center text-gray-500">
          Chat messages will appear here...
        </div>
      </div>

      <div className="p-4 bg-gray-900">
        {/* Replace this with ChatInput component later */}
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e81cff]"
        />
      </div>
    </div>
  );
};

export default ProRoomPage;
