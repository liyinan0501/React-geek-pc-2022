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
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { baseURL } from 'utils/request'

export default class Post extends Component {
  state = {
    type: 1,
    fileList: [
      {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    showPreview: false,
    previewUrl: '',
  }
  render() {
    const { type, fileList, showPreview, previewUrl } = this.state
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
            initialValues={{ content: '', type: type }}
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
              {type !== 0 && (
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  action={`${baseURL}upload`}
                  name="image"
                  onChange={this.uploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length < type && <PlusOutlined />}
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
        {/* 用于显示预览 */}
        <Modal
          visible={showPreview}
          title={'Preview'}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewUrl}
          />
        </Modal>
      </div>
    )
  }
  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    })
  }
  uploadImage = ({ fileList }) => {
    this.setState({
      fileList,
    })
  }
  handlePreview = (file) => {
    const url = file.url || file.response.data.url
    this.setState({
      showPreview: true,
      previewUrl: url,
    })
  }

  handleCancel = () => {
    this.setState({
      showPreview: false,
      previewUrl: '',
    })
  }

  beforeUpload = (file) => {
    if (file.size >= 1024 * 500) {
      message.warn('Uploaded image can not over 500kb')
      return false
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.warn('Can only upload png and jpeg images')
      return false
    }
    return true
  }
  onFinish = (values) => {
    console.log(values)
  }
}
