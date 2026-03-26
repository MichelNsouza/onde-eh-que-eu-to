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
          {{ formatNome(value) }}
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

    <!-- TEMPORADA -->
    <template v-slot:item.temporada="{ item }">
      <EditableCell
        v-if="editingId === item.id"
        :value="item.temporada"
        :editable="true"
        @save="onSave(item.id, { temporada: Number($event) })"
      >
        <template #input="{ value, update }">
          <v-text-field
            :model-value="value"
            @update:model-value="update"
            type="number"
            min="1"
            single-line
            autofocus
          />
        </template>
      </EditableCell>
      <CapituloControl
        v-else
        :value="item.temporada"
        @increment="$emit('incrementTemporada', item)"
        @decrement="$emit('decrementTemporada', item)"
      />
    </template>

    <!-- CAPÍTULO -->
    <template v-slot:item.capitulo="{ item }">
      <EditableCell
        v-if="editingId === item.id"
        :value="item.capitulo"
        :editable="true"
        @save="onSave(item.id, { capitulo: Number($event) })"
      >
        <template #input="{ value, update }">
          <v-text-field
            :model-value="value"
            @update:model-value="update"
            type="number"
            min="1"
            single-line
            autofocus
          />
        </template>
      </EditableCell>
      <CapituloControl
        v-else
        :value="item.capitulo"
        @increment="$emit('increment', item)"
        @decrement="$emit('decrement', item)"
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

    <!-- STATUS -->
    <template v-slot:item.status="{ item }">
      <EditableCell
        :value="item.status"
        :editable="editingId === item.id"
        @save="onSave(item.id, { status: $event })"
      >
        <template #default>
          <StatusChip :status="item.status" />
        </template>

        <template #input="{ value, update }">
          <v-select
            :items="statuses"
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
import StatusChip from '@/components/StatusChip.vue';
import TipoChip from '@/components/TipoChip.vue';

export default {
  name: 'ReadingListTable',

  components: {
    EditableCell,
    CapituloControl,
    StatusChip,
    TipoChip
  },

  props: {
    items: Array,
    headers: Array,
    loading: Boolean,
    tipos: Array,
    statuses: Array
  },

  data () {
    return {
      editingId: null
    }
  },

  methods: {
    formatNome (value) {
      if (!value) return ''
      return value
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    },

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
          item.status === 'finalizado' ? 'row-finalizado' : '',
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
