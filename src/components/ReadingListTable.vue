<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="20"
  >
    <template v-slot:item.nome="{ item }">
      <EditableCell
        :value="item.nome"
        @save="$emit('update', item.id, { nome: $event })"
      >
        <template #default="{ value }">{{ value }}</template>
        <template #input="{ value, update }">
        <v-text-field
            :model-value="value"
            @update:model-value="update"
            single-line
        />
        </template>

      </EditableCell>
    </template>

    <template v-slot:item.capitulo="{ item }">
      <CapituloControl
        :value="item.capitulo"
        @increment="$emit('increment', item)"
        @decrement="$emit('decrement', item)"
        @update="$emit('update', item.id, { capitulo: $event })"
      />
    </template>
<template v-slot:item.link="{ item }">
  <EditableCell
    :value="item.link"
    @save="$emit('update', item.id, { link: $event })"
  >
    <template #default="{ value }">
      <a
        v-if="value"
        :href="value"
        target="_blank"
        rel="noopener"
      >
        {{ value }}
      </a>
      <span v-else class="text-grey">sem link</span>
    </template>

    <template #input="{ value, update }">
      <v-text-field
        :model-value="value"
        @update:model-value="update"
        placeholder="https://..."
        single-line
      />
    </template>
  </EditableCell>
</template>

    <template v-slot:item.tipo="{ item }">
      <EditableCell
        :value="item.tipo"
        @save="$emit('update', item.id, { tipo: $event })"
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
      <v-btn icon small color="error" @click="$emit('delete', item)">
        <v-icon small>mdi-delete</v-icon>
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
  components: { EditableCell, CapituloControl, TipoChip },
  props: {
    items: Array,
    headers: Array,
    loading: Boolean,
    tipos: Array
  }
}
</script>
