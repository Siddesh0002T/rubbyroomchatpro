import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getUsername } from '../utils/helper';
import SetUsernameModal from '../components/SetUsernameModal';
import pb from '../utils/pocketbase';

interface Message {
  id: string;
  username: string;
  message: string;
}

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [username, setUsernameState] = useState<string | null>(null);

  const messagesRef = useRef<Message[]>([]); // 🔁 To keep track without stale state

  useEffect(() => {
    const storedUsername = getUsername();
    if (!storedUsername) {
      setShowModal(true);
    } else {
      setUsernameState(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!roomId) return;

    let unsubscribe: (() => void) | undefined;

    const fetchMessages = async () => {
      try {
        const msgs = await pb.collection('messages').getFullList<Message>({
          filter: `roomId="${roomId}" && isDeleted=false`,
          sort: '+created'
        });

        setMessages(msgs);
        messagesRef.current = msgs;
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    const subscribeToMessages = async () => {
      unsubscribe = await pb.collection('messages').subscribe('*', (e) => {
        if (
          e.action === 'create' &&
          e.record.roomId === roomId &&
          !messagesRef.current.find((m) => m.id === e.record.id)
        ) {
          const newMsg = {
            id: e.record.id,
            username: e.record.username,
            message: e.record.message,
          };

          messagesRef.current = [...messagesRef.current, newMsg];
          setMessages(messagesRef.current);
        }
      });
    };

    fetchMessages();
    subscribeToMessages();

    return () => {
      pb.collection('messages').unsubscribe('*');
      unsubscribe?.();
    };
  }, [roomId]);

  const handleSend = async () => {
    if (newMessage.trim() === '' || !username || !roomId) return;

    try {
      await pb.collection('messages').create({
        roomId,
        username,
        message: newMessage,
        isDeleted: false,
      });

      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      {showModal && (
        <SetUsernameModal
          onClose={() => {
            const storedUsername = getUsername();
            if (storedUsername) {
              setUsernameState(storedUsername);
              setShowModal(false);
            }
          }}
        />
      )}

      <h1 className="text-white text-2xl mb-4">
        Room ID: <span className="text-[#e81cff]">{roomId}</span>
      </h1>

      <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 flex flex-col space-y-2 mb-4 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="text-left">
              <span className="text-[#e81cff] font-semibold">{msg.username}: </span>
              <span className="text-white">{msg.message}</span>
            </div>
          ))
        )}
      </div>

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
