<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="emitUpdate"
    max-width="400"
  >
    <v-card>
      <v-card-title>Confirmar Exclusão</v-card-title>

      <v-card-text>
        Tem certeza que deseja excluir
        <strong>{{ item?.nome }}</strong>?
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="error" @click="confirm">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDeleteDialog',

  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      default: null
    }
  },

  emits: ['update:modelValue', 'confirm'],

  methods: {
    emitUpdate(value) {
      this.$emit('update:modelValue', value)
    },

    close() {
      this.emitUpdate(false)
    },

    confirm() {
      this.$emit('confirm')
      this.close()
    }
  }
}
</script>
