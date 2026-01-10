<template>
  <div class="d-flex align-center">
    <v-btn
      icon
      size="small"
      :disabled="value <= 1"
      @click="$emit('decrement')"
    >
      <v-icon size="small">mdi-minus</v-icon>
    </v-btn>

    <span class="mx-3 font-weight-medium">
      {{ value }}
    </span>

    <v-btn
      icon
      size="small"
      @click="$emit('increment')"
    >
      <v-icon size="small">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CapituloControl',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
