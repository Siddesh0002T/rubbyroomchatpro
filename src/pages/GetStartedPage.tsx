import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure you have the pink chat bubble as SVG

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      
      {/* Logo and App Title */}
      <div className="flex items-center space-x-2 mb-4">
        <img 
          src={logo} 
          alt="Rubby Logo" 
          className="w-12 h-12 md:w-16 md:h-16 object-contain" 
        />
        <div className="flex flex-col items-start leading-tight">
          <span className="text-white text-4xl md:text-5xl font-bold">Rubby</span>
          <span className="text-gray-400 text-2xl md:text-3xl">Room Chat</span>
        </div>
      </div>

      {/* Subheading */}
      <p className="text-gray-400 text-base md:text-lg mb-8">
        Chat with unknown people instantly
      </p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate('/set-username')}
        className="bg-[#e81cff] text-white font-medium text-lg md:text-xl py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default GetStartedPage;
