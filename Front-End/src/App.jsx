import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { login } from './pages/login'
import { main } from './pages/app'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< login/>}/>
        <Route path='/app' element={< main />}/>
      </Routes>
    </Router>
  )
}

export default App
