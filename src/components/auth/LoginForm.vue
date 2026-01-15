<template>
  <v-card class="mx-auto mt-10" max-width="400">
    <v-card-title>Login</v-card-title>

    <v-card-text>
      <v-text-field
        v-model="localEmail"
        label="Email"
        :disabled="loading"
      />
      <v-text-field
        v-model="localPassword"
        label="Senha"
        type="password"
        :disabled="loading"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        block
        :loading="loading"
        @click="submit"
      >
        Entrar
      </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="primary" block @click="$router.push('/registrar')">
          Registrar-se
        </v-btn>
      </v-card-actions>

    <v-alert
      v-if="error"
      type="error"
      dense
      class="ma-3"
    >
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      localEmail: '',
      localPassword: ''
    }
  },

  methods: {
    submit() {
      this.$emit('submit', {
        email: this.localEmail,
        password: this.localPassword
      })
    }
  }
}
</script>
