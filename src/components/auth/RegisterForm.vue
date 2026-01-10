<template>
  <v-card class="mx-auto mt-10" max-width="400">
    <v-card-title>Criar Conta</v-card-title>

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

      <v-text-field
        v-model="confirmPassword"
        label="Confirmar Senha"
        type="password"
        :disabled="loading"
        :error="passwordError"
        :error-messages="passwordError ? ['As senhas não conferem'] : []"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        block
        :loading="loading"
        @click="submit"
      >
        Registrar
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
  name: 'RegisterForm',

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
      localPassword: '',
      confirmPassword: ''
    }
  },

  computed: {
    passwordError() {
      return (
        this.confirmPassword &&
        this.localPassword !== this.confirmPassword
      )
    }
  },

  methods: {
    submit() {
      if (this.passwordError) return

      this.$emit('submit', {
        email: this.localEmail,
        password: this.localPassword
      })
    }
  }
}
</script>
