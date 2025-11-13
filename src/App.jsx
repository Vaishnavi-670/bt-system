import { useState } from 'react'
import './App.css'
import Report from './Components/Report'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import TaskTracker from './Components/TaskTracker'
import TaskUpdate from './Components/TaskUpdate'
import LeadTracker from './Components/LeadTracker'

function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <h1>Home</h1>
      <button
        className="form-toggle-buttons small"
        onClick={() => navigate('/report')}
      >
        Report
      </button>
      <button
        className="form-toggle-buttons small"
        onClick={() => navigate('/task-update')}
      >
        Task Update
      </button>
      <button
        className="form-toggle-buttons small"
        onClick={() => navigate('/task-tracker')}
      >
        Task Tracker
      </button>
      <button
        className="form-toggle-buttons small"
        onClick={() => navigate('/lead-tracker')}
      >
        Lead Tracker
      </button>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/task-update" element={<TaskUpdate />} />
        <Route path="/task-tracker" element={<TaskTracker />} />
        <Route path="/lead-tracker" element={<LeadTracker />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App