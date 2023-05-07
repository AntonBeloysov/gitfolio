import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './components/userPage';
import Reg from './components/registration';
import './style/style.css';
import './style/media.css';

function App() {
  return (
    <section>
      <h1 className="title-logo__app"><span className="git_logo-app">git</span>.folio</h1>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Reg />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </Router>
      </div>
      <h1 className="title-creacted-by">Created by Anton Beloysov</h1>
    </section>
  );
}

export default App;
