import axios from 'axios'

// STUB DATA START
const RESOLVE_WAIT_MS = 200

const STUB_RESTAURANT_LIST = {
  123: {
    id: 123,
    name: '焼肉酒家 李苑',
    area: '東新宿',
    genre: '焼肉、居酒屋、ステーキ',
    rating: 3.17,
    review: 36,
    prText: 'A5最高黒毛和牛の宮崎牛が食べられるお店',
    lowerLimitBudget: '3000',
    upperLimitBudget: '3999',
    distance: 456,
  },
  156: {
    id: 156,
    name: '日本海庄や ダイワロイネットホテル浜松店',
    area: '新浜松',
    genre: '居酒屋',
    rating: 3.04,
    review: 11,
    prText: '全国各地から仕入れた自慢の新鮮魚介！お酒のお供にぴったりのメニューは約100種類！',
    lowerLimitBudget: '2000',
    upperLimitBudget: '2999',
    distance: 111,
  }
}
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
