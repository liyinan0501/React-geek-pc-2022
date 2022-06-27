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
/**
 * post article
 * @param {*} data
 * @returns
 */

export const addArticle = (data, draft = false) => {
  return request.post(`/mp/articles?draft=${draft}`, data)
}

/**
 * get article by id
 * @param {*} id
 * @returns
 */
export const getArticleById = (id) => {
  return request.get(`/mp/articles/${id}`)
}

/**
 * edit article by id
 * @param {*} data
 * @param {*} draft
 * @returns
 */
export const updateArticle = (data, draft) => {
  return request.put(`/mp/articles/${data.id}?draft=${draft}`, data)
}
