import axios from 'axios'
import stubRestaurantList from '../stub/restaurantList'

// STUB DATA START
const RESOLVE_WAIT_MS = 200

const STUB_RESTAURANT_LIST = stubRestaurantList.list
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
