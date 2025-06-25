import React from 'react';

interface Props {
  username: string;
  message: string;
  time: string;
  isSelf: boolean;
}

const MessageBubble: React.FC<Props> = ({ username, message, time, isSelf }) => {
  return (
    <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} mb-4`}>
      {!isSelf && (
        <span className="text-xs text-white font-medium mb-1 px-2 py-0.5 bg-purple-700 rounded-full">
          {username}
        </span>
      )}

      <div
        className={`
          max-w-[80%] px-4 py-2 text-sm text-white 
          ${isSelf ? 'bg-blue-600 rounded-2xl rounded-br-none' : 'bg-gray-800/70 backdrop-blur-md rounded-2xl rounded-bl-none'}
        `}
      >
        {message}
      </div>

      <span className="text-xs text-gray-400 mt-1 px-1">{time}</span>
    </div>
  );
};

export default MessageBubble;
