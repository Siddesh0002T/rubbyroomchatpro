import React from "react";

const App: React.FC = () => {
  const handleStart = () => {
    window.location.href = "/set-username";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white font-sans">
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold mb-2">Rubby Room Chat</h1>
        <p className="text-gray-400 mb-8">Chat with unknown people instantly</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-primary text-black font-semibold rounded-full hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default App;