import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class AuthRoute extends Component {
  render() {
    //把接受到的component用render渲染
    // ...rest 解构的剩余参数
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (hasToken()) {
            return <Component {...routeProps}></Component>
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: routeProps.location.pathname,
                  },
                }}
              ></Redirect>
            )
            // props.history.push('/login')
          }
        }}
      ></Route>
    )
  }
}
