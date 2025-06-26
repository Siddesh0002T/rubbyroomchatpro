import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  username: string;
  message: string;
  time: string;
  isSelf: boolean;
}

const MessageBubble: React.FC<Props> = ({ username, message, time, isSelf }) => {
  const isRubby = username === 'Rubby';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
        duration: 0.4,
      }}
      className={`flex flex-col w-full ${isSelf ? 'items-end' : 'items-start'} mb-4`}
    >
      {/* Username Tag */}
      {!isSelf && !isRubby && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold text-white bg-purple-700 px-2 py-0.5 rounded-full mb-1"
        >
          {username}
        </motion.span>
      )}
      {isRubby && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-pink-300 font-semibold bg-black/50 border border-pink-400 px-2 py-0.5 rounded-full mb-1"
        >
          🤖 Rubby
        </motion.span>
      )}

      {/* Bubble */}
      <motion.div
        initial={{ opacity: 0, x: isSelf ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          max-w-[80%] sm:max-w-[70%] md:max-w-[60%] text-sm px-4 py-2
          ${
            isRubby
              ? 'bg-gray-900 text-white border-2 border-[conic-gradient(at_top_left,_#e81cff,_#40c9ff)] rounded-2xl shadow-[0_0_10px_rgba(232,28,255,0.5)]'
              : isSelf
              ? 'bg-blue-600 text-white rounded-2xl rounded-br-none shadow-md'
              : 'bg-gray-800/70 text-white backdrop-blur-sm rounded-2xl rounded-bl-none shadow-sm'
          }
        `}
      >
        {message}
      </motion.div>

      {/* Time */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xs text-gray-400 mt-1 px-1"
      >
        {time}
      </motion.span>
    </motion.div>
  );
};

export default MessageBubble;
