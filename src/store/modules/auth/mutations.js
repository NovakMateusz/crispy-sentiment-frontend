export default {
  loginUser(state, payload) {
    state.token = payload.token
  },
  logoutUser(state) {
    state.token = null
  }
}
