import { ref } from 'vue'
import { supabase } from '@/supabase'

export function useReadingList() {
  const items = ref([])
  const loading = ref(false)

  const buscarItems = async () => {
    loading.value = true
    const { data } = await supabase
      .from('reading_list')
      .select('*')
      .order('updated_at', { ascending: false })
    
    items.value = data || []
    loading.value = false
  }

  const addItem = async (item) => {
    const { data } = await supabase
      .from('reading_list')
      .insert([item])
      .select()
    return data[0]
  }

  const atualizarItem = async (id, updates) => {
    await supabase
      .from('reading_list')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', id)
  }

  const incrementarCapitulo = async (id, currentValue) => {
    await updateItem(id, { capitulo: currentValue + 1 })
  }

  const decrementarCapitulo = async (id, currentValue) => {
    if (currentValue > 1) {
      await updateItem(id, { capitulo: currentValue - 1 })
    }
  }

  const deletarItem = async (id) => {
    await supabase.from('reading_list').delete().eq('id', id)
  }

  return {
    items,
    loading,
    buscarItems,
    addItem,
    atualizarItem,
    incrementarCapitulo,
    decrementarCapitulo,
    deletarItem
  }
}