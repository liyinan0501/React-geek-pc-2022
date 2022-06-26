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
} from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'

const { Option } = Select
const { RangePicker } = DatePicker

export default class ContentControl extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Publish date',
      dataIndex: 'tags',
    },
    {
      title: 'Views',
      dataIndex: 'tags',
    },
    {
      title: 'Comments',
      dataIndex: 'tags',
    },
    {
      title: 'Likes',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      dataIndex: 'tags',
    },
  ]

  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  state = {
    channels: [],
    articles: {},
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
        <Card title={`Total xxx results:`}>
          <Table columns={this.columns} dataSource={this.data} />
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
