<template>
  <!-- MODO VISUAL -->
  <span
    v-if="!editable"
    class="editable-cell view"
  >
    <slot :value="value">
      {{ value }}
    </slot>
  </span>

  <!-- MODO EDIÇÃO -->
  <v-menu
    v-else
    v-model="open"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <span
        v-bind="props"
        class="editable-cell edit"
      >
        <slot :value="value">
          {{ value }}
        </slot>
      </span>
    </template>

    <v-card min-width="220" class="pa-2">
      <slot
        name="input"
        :value="localValue"
        :update="update"
      >
        <v-text-field
          v-model="localValue"
          density="compact"
          autofocus
          @keydown.enter="save"
        />
      </slot>

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
  value: [String, Number],
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save'])

const open = ref(false)
const localValue = ref(props.value)

watch(
  () => props.value,
  v => (localValue.value = v)
)

watch(
  () => props.editable,
  v => {
    open.value = v
    if (v) localValue.value = props.value
  }
)

function update (v) {
  localValue.value = v
}

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
.editable-cell.view {
  cursor: default;
}

.editable-cell.edit {
  cursor: text;
}
</style>
