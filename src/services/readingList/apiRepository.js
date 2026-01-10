import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const ApiReadingListRepository = {
  async getAll() {
    const { data } = await api.get('/reading-list')
    return data
  },

  async create(item) {
    const { data } = await api.post('/reading-list', item)
    return data
  },

  async update(id, updates) {
    const { data } = await api.put(`/reading-list/${id}`, updates)
    return data
  },

  async delete(id) {
    await api.delete(`/reading-list/${id}`)
    return true
  },

  async incrementCapitulo(id, currentValue) {
    return this.update(id, { capitulo: currentValue + 1 })
  },

  async decrementCapitulo(id, currentValue) {
    if (currentValue > 1) {
      return this.update(id, { capitulo: currentValue - 1 })
    }
    return null
  }
}

export default ApiReadingListRepository
