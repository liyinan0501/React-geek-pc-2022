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
    selectedKey: this.props.location.pathname,
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
                // 如果高亮不变，用defaultSelectKeys
                // 如果高亮变，用selectedKeys
                selectedKeys={[this.state.selectedKey]}
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
            <Layout style={{ padding: '24px', overflow: 'auto' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Dashboard}></Route>
                  <Route
                    path="/home/contentcontrol"
                    component={ContentControl}
                  ></Route>
                  <Route
                    exact
                    path="/home/post"
                    component={Post}
                    key="add"
                    // 一旦key值发生变化，会销毁原来的post。
                  ></Route>
                  <Route
                    path="/home/post/:id"
                    component={Post}
                    key="edit"
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    let pathname = this.props.location.pathname
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (pathname.startsWith('/home/post')) {
        pathname = '/home/post'
      }
      this.setState({
        selectedKey: pathname,
      })
    }
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
