import request from 'utils/request'

/**
 * Login request for user
 * @param {string} mobile Phone number
 * @param {string} code Identifying code
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}
