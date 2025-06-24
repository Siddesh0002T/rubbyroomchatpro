import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage';
import SetUsernamePage from './pages/SetUsernamePage'; // Import your SetUsernamePage component
import CreateRoomPage from './pages/CreateRoomPage'; // Import your CreateRoomPage component
import RoomPage from './pages/RoomPage'; // Import your RoomPage component

const App: React.FC = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/set-username" element={<SetUsernamePage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
           <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
