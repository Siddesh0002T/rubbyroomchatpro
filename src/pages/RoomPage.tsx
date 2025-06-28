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
import { encryptText, decryptText } from '../utils/crypto';
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

  // 🟡 Fix mobile input hide issue (keyboard opens)
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    };

    window.addEventListener('focusin', handleFocus);

    return () => window.removeEventListener('focusin', handleFocus);
  }, []);

  // 1️⃣ Get username
  useEffect(() => {
    const storedUsername = getUsername();
    if (!storedUsername) setShowModal(true);
    else setUsernameState(storedUsername);
  }, []);

  // 2️⃣ Fetch messages
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('created', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => {
        const data = doc.data();
        const decrypted = decryptText(data.message);
        return {
          id: doc.id,
          username: data.username,
          message: decrypted || '[error]',
          created: data.created?.toDate()?.toISOString() || '',
        };
      });

      setMessages(msgs);

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    });

    return () => unsubscribe();
  }, [roomId]);

  // 3️⃣ Rubby joins only once
  useEffect(() => {
    const sendJoin = async () => {
      if (!roomId || !username || hasSentJoinRef.current) return;
      hasSentJoinRef.current = true;

      const joinMessage = encryptText(`👋 @${username} just joined the chat.`);

      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        username: 'Rubby',
        message: joinMessage,
        created: serverTimestamp(),
      });
    };

    sendJoin();
  }, [roomId, username]);

  // 4️⃣ Scroll on resize (keyboard open/close)
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 5️⃣ Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !username || !roomId) return;

    const encrypted = encryptText(newMessage);

    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      username,
      message: encrypted,
      created: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Modal to set username */}
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

      {/* Chat header */}
      <div className="flex-none sticky top-0 z-20 bg-black">
        <ChatHeader roomId={roomId || 'Room'} />
      </div>

      {/* Messages list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth transition-all duration-300 ease-in-out"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          paddingBottom: '100px', // Space for keyboard
        }}
      >
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
      </div>

      {/* Message input */}
      <div
        className="bg-black px-4 pt-2 pb-[env(safe-area-inset-bottom)]"
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 20,
          backdropFilter: 'blur(10px)',
        }}
      >
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
