import axios from 'axios'

// STUB DATA START
const RESOLVE_WAIT_MS = 200
// STUB DATA END


const api = axios.create({
  baseURL: 'http://localhost:1337/api/',
})


export default {
  fetchUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('USER IS FOOBAR'), RESOLVE_WAIT_MS)
    })
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantList: (params) => {
    return api.get('/restaurant/list', params)
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailCommon: (params) => {
    return api.get('/restaurant/detail/common', params)
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailTop: (params) => {
    return api.get('/restaurant/detail/top', params)
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailPhoto: (params) => {
    return api.get('/restaurant/detail/photo', params)
  },

  // Example:
  getUser: (login) => api.get(`/users/${login}`),
  // getToken: (login, password) => api.post('/auth/token', {
  //   login,
  //   password,
  // }),
  // postArticle: (params) => api.post('/articles', params, tokenHeader()),
  // postIcon: (image) => {
  //   const data = new FormData()
  //   data.append('file', image, 'icon.png')
  //   return api.post('/file/icon', data, tokenHeader())
  // },
}
