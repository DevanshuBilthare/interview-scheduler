import React from 'react';
import Addparticipants from './Components/Addparticipants';
import CreateInterview from './Components/CreateInterview';
import ShowInterview from './Components/ShowInterviews';
import {Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="app_container">
    <Navbar />
    <Routes>
    <Route path="/createInterview" element={<CreateInterview/>}  />
    <Route path="/addParticipant" element={<Addparticipants/>}  />
    <Route path="/" element={<ShowInterview/>}  />
    </Routes>
    </div>
  )
}

export default App
