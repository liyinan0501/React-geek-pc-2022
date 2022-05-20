import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/index'
import Home from './pages/Layout/index'
import NotFound from './pages/404/index'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="login">Login</Link>
        <Link to="home">Home</Link> */}

        {/* Routes */}
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
