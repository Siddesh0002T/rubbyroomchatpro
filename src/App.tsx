import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage';
import CreateRoomPage from './pages/CreateRoomPage'; // Import your CreateRoomPage component
import RoomPage from './pages/RoomPage'; // Import your RoomPage component
import ProRoomPage from './pages/ProRoomPage'; // Import your ProRoomPage component

const App: React.FC = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
           <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path="/pro-room/:roomId" element={<ProRoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
