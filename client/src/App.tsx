import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as we develop more pages */}
        {/* <Route path="/venue" element={<Venue />} /> */}
        {/* <Route path="/corporate" element={<Corporate />} /> */}
        {/* <Route path="/menus" element={<Menus />} /> */}
        {/* <Route path="/events" element={<Events />} /> */}
        {/* <Route path="/reviews" element={<Reviews />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  )
}

export default App
