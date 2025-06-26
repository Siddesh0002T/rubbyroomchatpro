import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getUsername } from '../utils/helper';
import SetUsernameModal from '../components/SetUsernameModal';
import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasSentJoinRef = useRef(false);

  // 1️⃣ Username check
  useEffect(() => {
    const storedUsername = getUsername();
    if (!storedUsername) setShowModal(true);
    else setUsernameState(storedUsername);
  }, []);

  // 2️⃣ Fetch and subscribe to messages
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('created', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
        created: doc.data().created?.toDate()?.toISOString() || '',
      }));
      setMessages(msgs);

      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    });

    return () => unsubscribe();
  }, [roomId]);

  // 3️⃣ Rubby welcome message once
  useEffect(() => {
    const sendJoin = async () => {
      if (!roomId || !username || hasSentJoinRef.current) return;
      hasSentJoinRef.current = true;

      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        username: 'Rubby',
        message: `👋 @${username} just joined the chat.`,
        created: serverTimestamp(),
      });
    };

    sendJoin();
  }, [roomId, username]);

  // 4️⃣ Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !username || !roomId) return;

    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      username,
      message: newMessage,
      created: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="min-h-[100dvh] bg-black flex flex-col text-white">
      {/* Modal for username */}
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

      {/* Header */}
      <div className="sticky top-0 z-10 bg-black">
        <ChatHeader roomId={roomId || 'Room'} />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              username={msg.username}
              message={msg.message}
              time={new Date(msg.created).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              isSelf={msg.username === username}
            />
          ))
        )}
        {/* Dummy element to scroll to */}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 z-10 bg-black">
        <MessageInput
          message={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default RoomPage;
