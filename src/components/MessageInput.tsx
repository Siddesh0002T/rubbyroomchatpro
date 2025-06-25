import React from 'react';
import { SendHorizonal } from 'lucide-react';

const MessageInput = ({
  message,
  onChange,
  onSend,
}: {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="sticky bottom-0 z-50 w-full px-4 py-3 backdrop-blur-md bg-black/30">
      <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 bg-white/10">
        <input
          type="text"
          value={message}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          id="messageInput"
          className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"
        />
        <button
          onClick={onSend}
          className="text-white hover:scale-110 transition-transform"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
