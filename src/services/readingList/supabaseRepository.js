import { supabase } from '@/config/supabase'

const SupabaseReadingListRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from('reading_list')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async create(item) {
    const { data, error } = await supabase
      .from('reading_list')
      .insert([item])
      .select()

    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('reading_list')
      .update({
        ...updates,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('reading_list')
      .delete()
      .eq('id', id)

    if (error) throw error
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

export default SupabaseReadingListRepository
