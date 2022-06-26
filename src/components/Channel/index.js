import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'

const { Option } = Select
export default class Channel extends Component {
  state = {
    channels: [],
  }

  async componentDidMount() {
    this.getChannelList()
  }

  async getChannelList() {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }

  render() {
    return (
      <Select
        placeholder="Select"
        style={{ width: 120 }}
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.state.channels.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }
}
