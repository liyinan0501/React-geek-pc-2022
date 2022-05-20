import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'

export default class Login extends Component {
  render() {
    return (
      <div>
        Login Component<Button type="primary">Button</Button> <DatePicker />
      </div>
    )
  }
}
