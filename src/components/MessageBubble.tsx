import React from 'react';

const MessageBubble = ({
  username,
  message,
  time,
  isSelf,
}: {
  username: string;
  message: string;
  time: string;
  isSelf: boolean;
}) => {
  return (
    <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} mb-3`}>
      {!isSelf && (
        <span className="text-xs text-white px-2 py-1 rounded-full bg-purple-700 mb-1">
          {username}
        </span>
      )}
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-white text-sm ${
          isSelf ? 'bg-blue-600 rounded-br-none' : 'bg-gray-800 rounded-bl-none'
        }`}
      >
        {message}
      </div>
      <span className="text-xs text-gray-400 mt-1">{time}</span>
    </div>
  );
};

export default MessageBubble;
