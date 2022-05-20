import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
import NotFound from './pages/404'
function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">Login</Link>
        <Link to="/home">Home</Link>

        {/* Routing */}
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
