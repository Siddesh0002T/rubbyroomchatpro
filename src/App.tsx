import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage';
import SetUsernamePage from './pages/SetUsernamePage'; // Import your SetUsernamePage component

const App: React.FC = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/set-username" element={<SetUsernamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
