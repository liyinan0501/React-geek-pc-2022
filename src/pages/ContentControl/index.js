import React, { Component } from 'react'
import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
} from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

export default class ContentControl extends Component {
  columns = [
    {
      title: 'Cover',
      render: (data) => {
        if (data.cover.type === 0) {
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        } else {
          return (
            <img
              src={data.cover.images[0]}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            ></img>
          )
        }
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
    },
    {
      title: 'Publish date',
      dataIndex: 'pubdate',
    },
    {
      title: 'Views',
      dataIndex: 'read_count',
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count',
    },
    {
      title: 'Likes',
      dataIndex: 'like_count',
    },
    {
      title: 'Action',
      render: () => {
        return (
          <Space>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Space>
        )
      },
    },
  ]

  state = {
    channels: [],
    articles: {},
  }

  render() {
    const { total_count, results } = this.state.articles
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="#/">Content Control</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="Status" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Channel" name="channel_id">
              <Select placeholder="Select" style={{ width: 120 }}>
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date">
              <RangePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title={`Total ${total_count} results:`}>
          <Table columns={this.columns} dataSource={results} rowKey="id" />
        </Card>
      </div>
    )
  }

  async componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }

  async getChannelList() {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }

  async getArticleList() {
    const res = await getArticles()
    this.setState({
      articles: res.data,
    })
  }

  onFinish = (values) => {
    console.log(values)
  }
}
