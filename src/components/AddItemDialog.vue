<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="emitUpdate"
    max-width="500"
  >
    <v-card>
      <v-card-title>Adicionar Item</v-card-title>

      <v-card-text>
        <v-text-field v-model="item.nome" label="Nome" />
        <v-text-field v-model.number="item.temporada" label="Temporada" type="number" />
        <v-text-field v-model.number="item.capitulo" label="Capítulo" type="number" />
        <v-text-field v-model="item.link" label="Link" />
        <v-select v-model="item.tipo" :items="tipos" label="Tipo" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="primary" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddItemDialog',

  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    tipos: {
      type: Array,
      required: true
    }
  },

  emits: ['update:modelValue', 'save'],

  data() {
    return {
      item: {
        nome: '',
        temporada: 1,
        capitulo: 1,
        link: '',
        tipo: 'manga'
      }
    }
  },

  methods: {
    emitUpdate(value) {
      this.$emit('update:modelValue', value)
    },

    close() {
      this.emitUpdate(false)
    },

    save() {
      this.$emit('save', { ...this.item })
      this.close()
    }
  }
}
</script>
