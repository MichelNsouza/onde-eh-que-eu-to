<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    activator="parent"
  >
    <template #activator="{ props }">
      <span
        v-bind="props"
        class="editable-cell"
      >
        {{ value }}
      </span>
    </template>

    <v-card min-width="200" class="pa-2">
      <v-text-field
        v-model="localValue"
        density="compact"
        autofocus
        @keydown.enter="save"
      />

      <v-card-actions class="justify-end">
        <v-btn size="small" variant="text" @click="cancel">
          Cancelar
        </v-btn>
        <v-btn size="small" variant="flat" @click="save">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  value: [String, Number]
})

const emit = defineEmits(['save'])

const open = ref(false)
const localValue = ref(props.value)

watch(
  () => props.value,
  v => (localValue.value = v)
)

function save () {
  emit('save', localValue.value)
  open.value = false
}

function cancel () {
  localValue.value = props.value
  open.value = false
}
</script>

<style scoped>
.editable-cell {
  cursor: pointer;
}
</style>
