import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { login } from './pages/login'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< login/>} />
        <Route path='/app'/>
      </Routes>
    </Router>

  )
}

export default App
