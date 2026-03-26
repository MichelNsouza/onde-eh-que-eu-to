<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        Minhas Leituras
        <div class="d-flex gap-2">
          <v-btn
            :icon="showAdulto ? 'mdi-eye' : 'mdi-eye-off'"
            :color="showAdulto ? 'primary' : 'grey'"
            variant="text"
            @click="showAdulto = !showAdulto"
          />
          <v-btn color="primary" @click="addDialog = true">
            <v-icon>mdi-plus</v-icon>
            Adicionar
          </v-btn>
        </div>
      </v-card-title>

      <ReadingListTable
        :items="lendoItems"
        :headers="headers"
        :loading="loading"
        :tipos="tipos"
        :statuses="statuses"
        @update="updateItemField"
        @increment="incrementCap"
        @decrement="decrementCap"
        @incrementTemporada="incrementTemp"
        @decrementTemporada="decrementTemp"
        @delete="confirmDelete"
      />
    </v-card>

    <v-expansion-panels class="mt-4" multiple>
      <v-expansion-panel v-if="queroLerItems.length">
        <v-expansion-panel-title>
          Quero acompanhar ({{ queroLerItems.length }})
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ReadingListTable
            :items="queroLerItems"
            :headers="headers"
            :loading="loading"
            :tipos="tipos"
            :statuses="statuses"
            @update="updateItemField"
            @increment="incrementCap"
            @decrement="decrementCap"
            @incrementTemporada="incrementTemp"
            @decrementTemporada="decrementTemp"
            @delete="confirmDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="pausadoItems.length">
        <v-expansion-panel-title>
          Pausados ({{ pausadoItems.length }})
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ReadingListTable
            :items="pausadoItems"
            :headers="headers"
            :loading="loading"
            :tipos="tipos"
            :statuses="statuses"
            @update="updateItemField"
            @increment="incrementCap"
            @decrement="decrementCap"
            @incrementTemporada="incrementTemp"
            @decrementTemporada="decrementTemp"
            @delete="confirmDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="abandonadoItems.length">
        <v-expansion-panel-title>
          Abandonados ({{ abandonadoItems.length }})
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ReadingListTable
            :items="abandonadoItems"
            :headers="headers"
            :loading="loading"
            :tipos="tipos"
            :statuses="statuses"
            @update="updateItemField"
            @increment="incrementCap"
            @decrement="decrementCap"
            @incrementTemporada="incrementTemp"
            @decrementTemporada="decrementTemp"
            @delete="confirmDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="finishedItems.length">
        <v-expansion-panel-title>
          Finalizados ({{ finishedItems.length }})
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ReadingListTable
            :items="finishedItems"
            :headers="headers"
            :loading="loading"
            :tipos="tipos"
            :statuses="statuses"
            @update="updateItemField"
            @increment="incrementCap"
            @decrement="decrementCap"
            @incrementTemporada="incrementTemp"
            @decrementTemporada="decrementTemp"
            @delete="confirmDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <AddItemDialog
      v-model="addDialog"
      :tipos="tipos"
      :statuses="statuses"
      @save="addNewItem"
    />

    <v-btn
      color="error"
      variant="outlined"
      @click="logout"
    >
      <v-icon start>mdi-logout</v-icon>
      Sair
    </v-btn>

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
      showAdulto: false,

      headers: [
        { title: 'Nome', key: 'nome', sortable: true },
        { title: 'Temporada', key: 'temporada', sortable: true },
        { title: 'Capítulo', key: 'capitulo', sortable: true },
        { title: 'Link', key: 'link' },
        { title: 'Tipo', key: 'tipo', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Ações', key: 'actions', sortable: false }
      ],

      tipos: ['manga', 'manhwa', 'manhua', 'serie', 'anime', 'livro', 'comic', 'adulto'],
      statuses: ['acompanhando', 'quero acompanhar', 'pausado', 'abandonado', 'finalizado']
    }
  },

  mounted() {
    // ✅ AQUI ESTÁ A CORREÇÃO
    this.repo = readingListRepository
    this.fetchItems()
  },

  computed: {
    visibleItems() {
      return this.showAdulto ? this.items : this.items.filter(i => i.tipo !== 'adulto')
    },
    lendoItems() {
      return this.visibleItems.filter(i => i.status === 'acompanhando')
    },
    queroLerItems() {
      return this.visibleItems.filter(i => i.status === 'quero acompanhar')
    },
    pausadoItems() {
      return this.visibleItems.filter(i => i.status === 'pausado')
    },
    abandonadoItems() {
      return this.visibleItems.filter(i => i.status === 'abandonado')
    },
    finishedItems() {
      return this.visibleItems.filter(i => i.status === 'finalizado')
    }
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

    async incrementTemp(item) {
      await this.repo.incrementTemporada(item.id, item.temporada)
      await this.fetchItems()
    },

    async decrementTemp(item) {
      await this.repo.decrementTemporada(item.id, item.temporada)
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
    },

    async logout () {
      await this.repo.logout()
      this.$router.push('/login')
    }
  }
}

</script>

<style scoped>
:deep(.v-data-table__wrapper) {
  overflow-x: auto;
}
</style>
