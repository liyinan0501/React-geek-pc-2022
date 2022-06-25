// encapsulate all of localStorage actions
const TOKEN_KEY = 'token-geek-pc-2022'

/**
 * Saving token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * Retrieve token
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * Removing token
 * @returns
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * token existing or not
 * @returns
 */
export const hasToken = () => !!getToken()
