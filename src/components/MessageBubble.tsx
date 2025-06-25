import React from 'react';

interface Props {
  username: string;
  message: string;
  time: string;
  isSelf: boolean;
}

const MessageBubble: React.FC<Props> = ({ username, message, time, isSelf }) => {
  const isRubby = username === 'Rubby';

  return (
    <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} mb-4`}>
      {/* Username */}
      {!isSelf && !isRubby && (
        <span className="text-xs text-white font-medium mb-1 px-2 py-0.5 bg-purple-700 rounded-full">
          {username}
        </span>
      )}
      {isRubby && (
        <span className="text-xs text-pink-300 font-semibold mb-1 px-2 py-0.5 bg-black/50 border border-pink-400 rounded-full">
          🤖 Rubby
        </span>
      )}

      {/* Message Box */}
      <div
        className={`
          max-w-[80%] px-4 py-2 text-sm
          ${isRubby
            ? 'bg-gray-900 text-white rounded-2xl border-2 border-[conic-gradient(at_top_left,_#e81cff,_#40c9ff)] shadow-[0_0_8px_rgba(232,28,255,0.8)]'
            : isSelf
            ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
            : 'bg-gray-800/70 text-white backdrop-blur-md rounded-2xl rounded-bl-none'}
        `}
      >
        {message}
      </div>

      {/* Time */}
      <span className="text-xs text-gray-400 mt-1 px-1">{time}</span>
    </div>
  );
};

export default MessageBubble;
