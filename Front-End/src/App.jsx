import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Main from './pages/app.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </Router>
  );
}
