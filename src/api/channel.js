import request from 'utils/request'

/**
 * get channel list
 * @returns
 */
export function getChannels() {
  return request.get('./channels')
}
