import React, { Component } from 'react'
import { Card, Breadcrumb, Form, Button, Space, Input } from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'

export default class Post extends Component {
  state = {
    channels: [],
  }
  render() {
    return (
      <div>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Post</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            size="large"
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{}}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Title can not be empty',
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="Input title of the article"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Channel"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: 'Select a channel',
                },
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="Cover"></Form.Item>
            <Form.Item label="Content"></Form.Item>
            {/* 距离左边偏移4 */}
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  Post
                </Button>
                <Button size="large"> Save</Button>
              </Space>
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
