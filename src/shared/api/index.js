import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api.satsukita-andon.com/dev/',
  baseURL: 'http://localhost:1337/api/',
});

export default {
  fetchUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('USER IS FOOBAR'), 300)
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
  //   const data = new FormData();
  //   data.append('file', image, 'icon.png');
  //   return api.post('/file/icon', data, tokenHeader());
  // },
};
