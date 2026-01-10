import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const ApiAuth = {
  async signIn(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return data.user
  },

  async signUp(email, password) {
    const { data } = await api.post('/auth/register', { email, password })
    localStorage.setItem('token', data.token)
    return data.user
  },

  async signOut() {
    localStorage.removeItem('token')
  },

  async getUser() {
    const token = localStorage.getItem('token')
    if (!token) return null

    const { data } = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data.user
  },

  onAuthChange(callback) {
    // API REST não tem listener real
    // simulamos com estado inicial
    this.getUser().then(user => {
      callback({ user })
    })
  }
}

export default ApiAuth
