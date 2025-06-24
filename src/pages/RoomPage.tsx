import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomPage: React.FC = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    // Add new message to chat
    setMessages([...messages, { user: 'You', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      {/* Room ID Display */}
      <h1 className="text-white text-2xl mb-4">Room ID: <span className="text-[#e81cff]">{roomId}</span></h1>

      {/* Chat Box */}
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 flex flex-col space-y-2 mb-4 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="text-left">
              <span className="text-[#e81cff] font-semibold">{msg.user}: </span>
              <span className="text-white">{msg.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="w-full max-w-md flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#e81cff]"
        />
        <button
          onClick={handleSend}
          className="bg-[#e81cff] text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
