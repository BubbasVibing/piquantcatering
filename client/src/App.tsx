import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Reviews from './pages/reviews'
import Menus from './pages/menus'
import EventsCatering from './pages/eventscatering'
import Contact from './pages/contact'
import Partnerships from './pages/partnerships'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/event-catering" element={<EventsCatering />} />
        <Route path="/food-partnerships" element={<Partnerships />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all route redirects to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
