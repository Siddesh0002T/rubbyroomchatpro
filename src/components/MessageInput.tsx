import React from 'react';

const MessageInput = ({
  message,
  onChange,
  onSend,
}: {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}) => {
  return (
    <div className="w-full px-4 py-3 bg-black flex gap-2 items-center">
      <input
        type="text"
        value={message}
        onChange={onChange}
        placeholder="Type a message..."
        className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 rounded-full focus:outline-none"
      />
      <button
        onClick={onSend}
        className="text-white bg-[#e81cff] rounded-full px-4 py-2 hover:scale-105 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
