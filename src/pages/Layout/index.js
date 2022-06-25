import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import Dashboard from 'pages/Dashboard'
import ContentControl from 'pages/ContentControl'
import Post from 'pages/Post'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'
const { Header, Content, Sider } = Layout

// css module need in css file using lowerCamelCase naming, do not use - dash sign
// console.log(styles)

export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="Are you sure to logout?"
                  okText="Confirm"
                  cancelText="Cancel"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined />
                  {` `}Logout
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={this.props.location.pathname}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
              >
                <Menu.Item key="/home" icon={<HomeOutlined></HomeOutlined>}>
                  <Link to="/home">Dashboard</Link>
                </Menu.Item>
                <Menu.Item
                  key="/home/contentcontrol"
                  icon={<DiffOutlined></DiffOutlined>}
                >
                  <Link to="/home/contentcontrol">Content Control</Link>
                </Menu.Item>
                <Menu.Item
                  key="/home/post"
                  icon={<EditOutlined></EditOutlined>}
                >
                  <Link to="/home/post">Post</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Dashboard}></Route>
                  <Route
                    path="/home/contentcontrol"
                    component={ContentControl}
                  ></Route>
                  <Route path="/home/post" component={Post}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  async componentDidMount() {
    const res = await getUserProfile()
    this.setState({
      profile: res.data,
    })
  }

  onConfirm = () => {
    // console.log('logout')
    removeToken()
    this.props.history.push('/login')
    message.success('Logout succeeds')
  }
}
