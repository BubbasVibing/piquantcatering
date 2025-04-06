import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ComingSoon from './pages/coming-soon'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue" element={<ComingSoon />} />
        <Route path="/corporate" element={<ComingSoon />} />
        <Route path="/menus" element={<ComingSoon />} />
        <Route path="/events" element={<ComingSoon />} />
        <Route path="/reviews" element={<ComingSoon />} />
        <Route path="/contact" element={<ComingSoon />} />
        {/* Catch-all route for any undefined routes */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </Router>
  )
}

export default App
