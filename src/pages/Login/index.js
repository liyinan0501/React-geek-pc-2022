import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import './index.scss'
import logo from 'assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          <Form
            size="large"
            validateTrigger={['onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13946003700',
              code: '123456',
              agree: true,
            }}
          >
            {/* validateTrigger={['onChange', 'onBlur']}> */}
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: 'Phone number can not be empty',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: 'Please input correct phone number',
                },
              ]}
            >
              <Input placeholder="Phone number" autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Identifying code can not be empty',
                },
                {
                  pattern: /^\d{6}$/,
                  message: 'Please input correct identifying code',
                  // validateTriggerL: 'onChange',
                },
              ]}
            >
              <Input placeholder="Identifying code" autoComplete="off" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Please agree terms and conditions')
                        ),
                },
              ]}
            >
              <Checkbox>Agree to terms and conditions</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = (values) => {
    console.log(values)
  }
}
