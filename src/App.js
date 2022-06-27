import { Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
// import Login from 'pages/Login/index'
// import Home from 'pages/Layout/index'
import NotFound from 'pages/404/index'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'

const Login = React.lazy(() => import('pages/Login'))
const Home = React.lazy(() => import('pages/Layout'))

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="login">Login</Link>
        <Link to="home">Home</Link> */}

        {/* Routes */}
        {/*fallback 兜底，加载不出来显示什么。 */}
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <Redirect exact from="/" to={'/home'}></Redirect>
            {/* <Route path="/home" component={Home}></Route> */}
            <AuthRoute path="/home" component={Home}></AuthRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
