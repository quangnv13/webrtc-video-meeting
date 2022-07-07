import React from 'react';
import { Outlet } from 'react-router-dom';
import Head from './Head/Head';
// import { Route, Routes } from 'react-router-dom';
// import JoinRoom from '../../components/room/joinRoom/JoinRoom';
// import ListRoom from '../../components/room/ListRoom';
const RoomPage = () => {
  return (
    <>
      <Head />
      <div className="p-10 pt-0 min-h-screen">
        {/* <Routes>
        <Route path="/" element={<ListRoom />} />
        <Route path="/ngu" element={<JoinRoom />} />
      </Routes>
      <ListRoom /> */}
        <Outlet />
      </div>
    </>
  );
};
export default RoomPage;
