<template>
  <v-chip small :color="color">
    {{ status }}
  </v-chip>
</template>

<script>
export default {
  name: 'StatusChip',
  props: {
    status: String
  },
  computed: {
    color() {
      const colors = {
        'acompanhando': 'green',
        'quero acompanhar': 'blue',
        'pausado': 'orange',
        'abandonado': 'red',
        'finalizado': 'grey'
      }
      return colors[this.status] || 'grey'
    }
  }
}
</script>
