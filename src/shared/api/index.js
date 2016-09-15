import axios from 'axios'

// STUB DATA START
const RESOLVE_WAIT_MS = 20
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

  fetchRestaurantList: (query, params) => {
    return api.get('/restaurant/list', { params: query })
  },

  fetchRestaurantDetailCommon: (query, params) => {
    return api.get(`/restaurant/detail/${params.restaurantId}/common`, { params: query })
  },

  fetchRestaurantDetailTop: (query, params) => {
    return api.get(`/restaurant/detail/${params.restaurantId}/top`, { params: query })
  },

  fetchRestaurantDetailPhoto: (query, params) => {
    return api.get(`/restaurant/detail/${params.restaurantId}/photo`, { params: query })
  },

  // the Review overview
  fetchRestaurantDetailReviews: (query, params) => {
    return api.get(`/restaurant/detail/${params.restaurantId}/reviews`, { params: query })
  },

  // the Individual Review Item
  fetchRestaurantDetailReview: (query, params) => {
    return api.get(`/restaurant/detail/${params.restaurantId}/review/${params.reviewId}`, { params: query })
  },

  // Example:
  // getUser: (login) => api.get(`/users/${login}`),
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
