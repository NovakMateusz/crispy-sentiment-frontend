export default {
  async login(context, payload) {
    const response = await fetch('http://0.0.0.0:8000/v1/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate.')
      throw error
    }

    context.commit('loginUser', { token: responseData.token })
  },

  async logout(context, token) {
    const response = await fetch('http://0.0.0.0:8000/v1/logout', {
      method: 'POST',
      headers: { authorization: token }
    })
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate.')
      throw error
    }

    context.commit('logoutUser')
  }
}
