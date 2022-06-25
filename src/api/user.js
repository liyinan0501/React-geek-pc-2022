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

/**
 * get user profile information
 * @returns
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/user/profile',
  })
}
