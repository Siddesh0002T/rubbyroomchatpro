import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/set-username" element={<div>Set Username Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
};

export default App;
