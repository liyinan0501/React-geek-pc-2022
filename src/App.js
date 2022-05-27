import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from 'pages/Login/index'
import Home from 'pages/Layout/index'
import NotFound from 'pages/404/index'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="login">Login</Link>
        <Link to="home">Home</Link> */}

        {/* Routes */}
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
