<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        Minhas Leituras
        <v-btn color="primary" @click="addDialog = true">
          <v-icon>mdi-plus</v-icon>
          Adicionar
        </v-btn>
      </v-card-title>

      <ReadingListTable
        :items="items"
        :headers="headers"
        :loading="loading"
        :tipos="tipos"
        @update="updateItemField"
        @increment="incrementCap"
        @decrement="decrementCap"
        @delete="confirmDelete"
      />
    </v-card>

    <AddItemDialog
      v-model="addDialog"
      :tipos="tipos"
      @save="addNewItem"
    />

    <ConfirmDeleteDialog
      v-model="deleteDialog"
      :item="itemToDelete"
      @confirm="deleteConfirmed"
    />
  </v-container>
</template>

<script>
import AddItemDialog from '@/components/AddItemDialog.vue';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import ReadingListTable from '@/components/ReadingListTable.vue';

import readingListRepository from '@/services/readingList';

export default {
  name: 'ReadingList',

  components: {
    ReadingListTable,
    AddItemDialog,
    ConfirmDeleteDialog
  },

  data() {
    return {
      repo: null,

      items: [],
      loading: false,

      addDialog: false,
      deleteDialog: false,
      itemToDelete: null,

      headers: [
        { text: 'Nome', value: 'nome', sortable: true },
        { text: 'Temporada', value: 'temporada', sortable: true, width: '120px' },
        { text: 'Capítulo', value: 'capitulo', sortable: true, width: '150px' },
        { text: 'Link', value: 'link', sortable: false },
        { text: 'Tipo', value: 'tipo', sortable: true, width: '120px' },
        { text: 'Ações', value: 'actions', sortable: false, width: '80px' }
      ],

      tipos: ['manga', 'manhwa', 'manhua', 'serie', 'anime', 'livro', 'comic']
    }
  },

  mounted() {
    // ✅ AQUI ESTÁ A CORREÇÃO
    this.repo = readingListRepository
    this.fetchItems()
  },

  methods: {
    async fetchItems() {
      this.loading = true
      try {
        this.items = await this.repo.getAll()
      } catch (error) {
        console.error('Erro ao carregar itens:', error)
      } finally {
        this.loading = false
      }
    },

    async updateItemField(id, updates) {
      await this.repo.update(id, updates)
      await this.fetchItems()
    },

    async incrementCap(item) {
      await this.repo.incrementCapitulo(item.id, item.capitulo)
      await this.fetchItems()
    },

    async decrementCap(item) {
      await this.repo.decrementCapitulo(item.id, item.capitulo)
      await this.fetchItems()
    },

    async addNewItem(item) {
      await this.repo.create(item)
      await this.fetchItems()
      this.addDialog = false
    },

    confirmDelete(item) {
      this.itemToDelete = item
      this.deleteDialog = true
    },

    async deleteConfirmed() {
      if (this.itemToDelete) {
        await this.repo.delete(this.itemToDelete.id)
        await this.fetchItems()
      }
      this.deleteDialog = false
      this.itemToDelete = null
    }
  }
}

</script>

<style scoped>
:deep(.v-data-table__wrapper) {
  overflow-x: auto;
}
</style>
