<template>
  <v-chip small :color="color">
    {{ tipo }}
  </v-chip>
</template>

<script>
export default {
  name: 'TipoChip',
  props: {
    tipo: String
  },
  computed: {
    color() {
      const colors = {
        manga: 'blue',
        manhwa: 'purple',
        manhua: 'red',
        serie: 'green',
        anime: 'orange',
        livro: 'brown',
        comic: 'pink'
      }
      return colors[this.tipo] || 'grey'
    }
  }
}
</script>
