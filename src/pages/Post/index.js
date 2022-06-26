import React, { Component } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'

export default class Post extends Component {
  state = {
    type: 1,
  }
  render() {
    return (
      <div className={styles.root}>
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
            initialValues={{ content: '', type: this.state.type }}
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
            <Form.Item label="Cover" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>Single photo</Radio>
                <Radio value={3}>Triple photos</Radio>
                <Radio value={0}>No photos</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              {this.state.type !== 0 && (
                <Upload listType="picture-card">
                  <PlusOutlined></PlusOutlined>
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'The content can not be empty.',
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                placeholder="Input the content of article"
              />
            </Form.Item>
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
  changeType = (e) => {
    this.setState({
      type: e.target.value,
    })
  }
  onFinish = (values) => {
    console.log(values)
  }
}
