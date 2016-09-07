import axios from 'axios'
import stubRestaurantList from '../stub/restaurantList'
import * as stubRestaurantDetail from '../stub/restaurantDetail'

// STUB DATA START
const RESOLVE_WAIT_MS = 200

const STUB_RESTAURANT_DETAIL = stubRestaurantDetail

const STUB_RESTAURANT_LIST = stubRestaurantList
// STUB DATA END


const api = axios.create({
  // baseURL: 'https://api.satsukita-andon.com/dev/',
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
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(STUB_RESTAURANT_LIST), RESOLVE_WAIT_MS)
    })
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailCommon: (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(STUB_RESTAURANT_DETAIL.common), RESOLVE_WAIT_MS)
    })
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailTop: (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(STUB_RESTAURANT_DETAIL.top), RESOLVE_WAIT_MS)
    })
  },

  // TODO: ひとまずstubデータを返却する
  fetchRestaurantDetailPhoto: (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(STUB_RESTAURANT_DETAIL.photo), RESOLVE_WAIT_MS)
    })
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
