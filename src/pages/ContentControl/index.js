import React, { Component } from 'react'
import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  DatePicker,
  Table,
  Tag,
  Space,
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getArticles, delArticle } from 'api/article'
import defaultImg from 'assets/error.png'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Channel from 'components/Channel'

const { RangePicker } = DatePicker
const { confirm } = Modal

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
      render: (data) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => this.handleEdit(data.id)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => this.handleDelete(data.id)}
            />
          </Space>
        )
      },
    },
  ]

  reqParams = {
    page: 1,
    per_page: 10,
  }

  state = {
    articles: {},
  }

  render() {
    const { total_count, results, per_page, page } = this.state.articles
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Content Control</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="Status" name="status" labelCol={{ span: 2 }}>
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Channel" name="channel_id" labelCol={{ span: 2 }}>
              <Channel></Channel>
            </Form.Item>

            <Form.Item label="Date" name="date" labelCol={{ span: 2 }}>
              <RangePicker />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 2 }}>
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title={`Total ${total_count} results:`}>
          <Table
            columns={this.columns}
            dataSource={results}
            rowKey="id"
            pagination={{
              position: ['bottomCenter'],
              total: total_count,
              pageSize: per_page,
              current: page,
              onChange: this.onChange,
            }}
          />
        </Card>
      </div>
    )
  }

  handleEdit = (id) => {
    this.props.history.push(`/home/post/${id}`)
  }

  handleDelete = (id) => {
    confirm({
      title: 'Do you want to delete this article?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this article will be deleted!',

      onOk: async () => {
        await delArticle(id)
        this.getArticleList()
        message.success('Delete succeeds!')
      },
    })
  }

  onChange = (page, pageSize) => {
    this.reqParams.page = page
    this.reqParams.per_page = pageSize
    this.getArticleList()
  }

  async componentDidMount() {
    this.getArticleList()
  }

  async getArticleList() {
    const res = await getArticles(this.reqParams)
    this.setState({
      articles: res.data,
    })
  }

  onFinish = ({ status, channel_id, date }) => {
    if (status !== -1) {
      this.reqParams.status = status
    } else {
      delete this.reqParams.status
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id
    } else {
      delete this.reqParams.channel_id
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      this.reqParams.end_pubdate = date[1]
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete this.reqParams.begin_pubdate
      delete this.reqParams.end_pubdate
    }
    // 如果查询操作，需要让页码值重新为1
    this.reqParams.page = 1
    console.log(this.reqParams)
    // 发请求
    this.getArticleList()
  }
}
