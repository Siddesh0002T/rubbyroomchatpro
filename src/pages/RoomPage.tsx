import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getUsername } from '../utils/helper';
import SetUsernameModal from '../components/SetUsernameModal';
import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';
import pb from '../utils/pocketbase';

interface Message {
  id: string;
  username: string;
  message: string;
  created: string;
}

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [username, setUsernameState] = useState<string | null>(null);

  const messagesRef = useRef<Message[]>([]);

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
          sort: '+created',
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
          const newMsg: Message = {
            id: e.record.id,
            username: e.record.username,
            message: e.record.message,
            created: e.record.created,
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
    <div className="min-h-screen bg-black flex flex-col text-white">
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

      <ChatHeader roomId={roomId || 'Room'} />

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              username={msg.username}
              message={msg.message}
              time={new Date(msg.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              isSelf={msg.username === username}
            />
          ))
        )}
      </div>

      <MessageInput
        message={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSend}
      />
    </div>
  );
};

export default RoomPage;
