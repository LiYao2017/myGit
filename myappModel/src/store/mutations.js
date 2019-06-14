import { localStorage } from '../assets/js/storage'

const mutations = {
  SET_USER (state, user) {
    state.user = user
    localStorage.setItem('user', user)
  },
  SET_OPENUSER (state, openid) {
    state.openid = openid
    localStorage.setItem('openid', openid)
  },
  SET_TOKEN (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  showLoading(state){
    state.LOADING = true
  },
  hideLoading (state) {
    state.LOADING = false
  }
}

export default mutations
