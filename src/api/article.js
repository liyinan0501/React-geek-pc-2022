import request from 'utils/request'

/**
 * get all articles
 */
export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}
/**
 * delete article
 * @param {*} id
 * @returns
 */
export const delArticle = (id) => {
  return request.delete(`/mp/articles/${id}`)
}
