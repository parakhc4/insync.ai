import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ParentDashboard from './pages/ParentDashboard';
import CookDashboard from './pages/CookDashboard';
import DriverDashboard from './pages/DriverDashboard';
import Home from './pages/Home';
// In src/index.js or App.js
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Router basename="/insync.ai">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/cook" element={<CookDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
