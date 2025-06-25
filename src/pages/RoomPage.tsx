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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasSentJoinRef = useRef(false);
  const hasScrolledRef = useRef(false);

  // 1️⃣ Username check
  useEffect(() => {
    const storedUsername = getUsername();
    if (!storedUsername) {
      setShowModal(true);
    } else {
      setUsernameState(storedUsername);
    }
  }, []);

  // 2️⃣ Fetch and subscribe to messages
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

        // Scroll to bottom initially
        setTimeout(() => {
          if (scrollRef.current && !hasScrolledRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            hasScrolledRef.current = true;
          }
        }, 100);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    const subscribeToMessages = async () => {
      unsubscribe = await pb.collection('messages').subscribe('*', (e) => {
        if (
          e.action === 'create' &&
          e.record.roomId === roomId &&
          !messages.find((m) => m.id === e.record.id)
        ) {
          const newMsg: Message = {
            id: e.record.id,
            username: e.record.username,
            message: e.record.message,
            created: e.record.created,
          };
          setMessages((prev) => [...prev, newMsg]);

          // Scroll to bottom if near bottom
          const el = scrollRef.current;
          if (el && el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
            setTimeout(() => {
              el.scrollTop = el.scrollHeight;
            }, 100);
          }
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

  // 3️⃣ Rubby welcome once per session
  useEffect(() => {
    const sendRubbyJoin = async () => {
      if (!roomId || !username || hasSentJoinRef.current) return;
      hasSentJoinRef.current = true;

      await pb.collection('messages').create({
        roomId,
        username: 'Rubby',
        message: `👋 @${username} just joined the chat.`,
        isDeleted: false,
      });
    };

    sendRubbyJoin();
  }, [roomId, username]);

  // 4️⃣ Rubby leave only on real close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (roomId && username) {
        navigator.sendBeacon(
          `${pb.baseUrl}/api/collections/messages/records`,
          JSON.stringify({
            roomId,
            username: 'Rubby',
            message: `👋 @${username} has left the chat.`,
            isDeleted: false,
          })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomId, username]);

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
    <div className="h-screen bg-black flex flex-col text-white overflow-hidden">
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
      <div className="sticky top-0 z-10">
        <ChatHeader roomId={roomId || 'Room'} />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth" ref={scrollRef}>
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
