import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export default class ContentControl extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
              <Link to= '/home'>Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Content Control</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        ></Card>
      </div>
    )
  }
}
