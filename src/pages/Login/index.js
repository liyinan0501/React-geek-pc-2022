import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
import { setToken } from 'utils/storage'

export default class Login extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          <Form
            size="large"
            validateTrigger={['onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
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
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = async ({ mobile, code }) => {
    this.setState({
      loading: true,
    })
    try {
      const res = await login(mobile, code)
      // Login succeeds
      // 3. message
      message.success('Login Succeeds!', 1, () => {
        // 1. save token
        setToken(res.data.token)
        // 2. Jump to front page
        this.props.history.push('/home')
      })
      // alert('Login Succeeds!')
    } catch (error) {
      // console.dir(error)
      message.warning(error.response.data.message, 1, function () {
        this.setState({
          loading: false,
        })
      })
    }
  }
}
