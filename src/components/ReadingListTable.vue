<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="20"
    :sort-by="[{ key: 'nome', order: 'asc' }]"
    :row-props="rowProps"
  >
    <!-- NOME -->
    <template v-slot:item.nome="{ item }">
      <EditableCell
        :value="item.nome"
        :editable="editingId === item.id"
        @save="onSave(item.id, { nome: $event })"
      >
        <template #default="{ value }">
          {{ value }}
        </template>

        <template #input="{ value, update }">
          <v-text-field
            :model-value="value"
            @update:model-value="update"
            single-line
            autofocus
          />
        </template>
      </EditableCell>
    </template>

    <template v-slot:item.capitulo="{ item }">
      <CapituloControl
        :value="item.capitulo"
        :disabled="editingId !== item.id"
        @increment="$emit('increment', item)"
        @decrement="$emit('decrement', item)"
        @update="onSave(item.id, { capitulo: $event })"
      />
    </template>

    <template v-slot:item.link="{ item }">
      <EditableCell
        :value="item.link"
        :editable="editingId === item.id"
        @save="onSave(item.id, { link: $event })"
      >
        <template #default="{ value }">
          <a
            v-if="value && value !== 'finalizado'"
            :href="value"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ value }}
          </a>
          <span v-else-if="value === 'finalizado'">
            Finalizado
          </span>
          <span v-else class="text-grey">
            sem link
          </span>
        </template>

        <template #input="{ value, update }">
          <v-text-field
            :model-value="value"
            @update:model-value="update"
            placeholder="https://... ou finalizado"
            single-line
            autofocus
          />
        </template>
      </EditableCell>
    </template>

    <template v-slot:item.tipo="{ item }">
      <EditableCell
        :value="item.tipo"
        :editable="editingId === item.id"
        @save="onSave(item.id, { tipo: $event })"
      >
        <template #default>
          <TipoChip :tipo="item.tipo" />
        </template>

        <template #input="{ value, update }">
          <v-select
            :items="tipos"
            :model-value="value"
            @update:model-value="update"
          />
        </template>
      </EditableCell>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        icon
        size="small"
        color="primary"
        @click="startEdit(item)"
        v-if="editingId !== item.id"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        icon
        size="small"
        color="success"
        @click="stopEdit"
        v-if="editingId === item.id"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>

      <v-btn
        icon
        size="small"
        color="error"
        @click="$emit('delete', item)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import CapituloControl from '@/components/CapituloControl.vue';
import EditableCell from '@/components/EditableCell.vue';
import TipoChip from '@/components/TipoChip.vue';

export default {
  name: 'ReadingListTable',

  components: {
    EditableCell,
    CapituloControl,
    TipoChip
  },

  props: {
    items: Array,
    headers: Array,
    loading: Boolean,
    tipos: Array
  },

  data () {
    return {
      editingId: null
    }
  },

  methods: {
    startEdit (item) {
      this.editingId = item.id
    },

    stopEdit () {
      this.editingId = null
    },

    onSave (id, payload) {
      this.$emit('update', id, payload)
    },

    rowProps ({ item, index }) {
      return {
        class: [
          index % 2 === 0 ? 'row-even' : 'row-odd',
          item.link === 'finalizado' ? 'row-finalizado' : '',
          this.editingId === item.id ? 'row-editing' : ''
        ]
      }
    }
  }
}
</script>

<style scoped>
:deep(.row-even) {
  background-color: rgb(var(--v-theme-surface));
}

:deep(.row-odd) {
    background-color: rgba(var(--v-theme-primary), 0.15) ;

}

:deep(.v-data-table tbody tr:hover) {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

:deep(.row-editing) {
  background-color: rgb(var(--v-theme-surface-variant)) !important;
}

:deep(.row-finalizado) {
  text-decoration: line-through;
  opacity: 0.6;
}

</style>
