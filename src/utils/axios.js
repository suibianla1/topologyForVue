import axios from 'axios'

const Axios = axios.create({
  timeout: 10000
})

Axios.interceptors.request.use(
  config => {
    return new Promise((resolve, reject)=>{
      return resolve(config)
    })
  },

  error => {
    console.error(error)
  }
)

Axios.interceptors.response.use(
  response => {
    return response.data
  },

  error => {
    if(error.response) {
      console.log(error.response)
      alert(error.response.statusText)
    }
  }
)

export default Axios

// export default function({ $axios, app, redirect }) {
//   $axios.setToken(app.$cookies.get('token'))

//   $axios.onResponse(response => {
//     if (response.error) {
//       app.store.commit('notice/error', { text: response.error })
//     }
//   })

//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 401) {
//       app.store.commit('notice/error', {
//         text: '请先登录！'
//       })
//     } else if (code === 403) {
//       redirect('/')
//     } else if (code === 500) {
//       app.store.commit('notice/error', {
//         text: error.response.error || '服务错误，请稍后重试！'
//       })
//     }
//   })
// }
