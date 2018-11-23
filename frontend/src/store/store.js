import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    }
  },
  mutations: {
    destroyToken (state) {
      state.token = null
    },
    retrieveToken (state, token) {
      state.token = token
    }
  },
  actions: {
    signup (context, data) {
      return new Promise((resolve, reject) => {
        this.$http.post('/api/auth/register', {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    destroyToken (context) {
      this.$http.axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          this.$http.axios.get('/api/auth/check', {
            headers: {
              'x-access-token': localStorage.getItem('access_token')
            }
          })
            .then(res => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(res)
            })
            .catch(err => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(err)
            })
        })
      }
    },
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        this.$http.axios.post('/api/auth/login', {
          id: credentials.id,
          password: credentials.password
        }).then(res => {
          const token = res.data.token
          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
})
