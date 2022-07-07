import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/auth/register/Register';
import JoinRoom from './components/room/joinRoom/JoinRoom';
import ListRoom from './components/room/ListRoom';
import About from './pages/About';
import LoginPage from './pages/auth';
import Home from './pages/Home';
import RoomPage from './pages/room';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="room" element={<RoomPage />}>
          <Route path="" element={<ListRoom />} />
          <Route path="join-room" element={<JoinRoom />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
