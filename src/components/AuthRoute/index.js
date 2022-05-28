import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class AuthRoute extends Component {
  render() {
    console.log(this.props)
    //把接受到的component用render渲染
    // ...rest 解构的剩余参数
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            return <Component {...props}></Component>
          } else {
            return <Redirect to="/login"></Redirect>
            // props.history.push('/login')
          }
        }}
      ></Route>
    )
  }
}
