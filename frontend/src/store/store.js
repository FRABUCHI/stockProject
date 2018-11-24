import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$http = axios

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    id: localStorage.getItem('id') || null
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    },
    id (state) {
      return state.id
    }
  },
  mutations: {
    destroyToken (state) {
      state.token = null
      state.id = null
    },
    retrieveToken (state, token, id) {
      state.token = token
      state.id = id
    }
  },
  actions: {
    signup (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', {
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
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/api/auth/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', {
          id: credentials.id,
          password: credentials.password
        }).then(res => {
          const token = res.data.token
          localStorage.setItem('id', credentials.id)
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
