<template>
  <v-container>
    <LoginForm
      :loading="loading"
      :error="error"
      @submit="handleLogin"
    />
  </v-container>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
import getAuthService from '@/services/auth';

export default {
  name: 'Login',

  components: {
    LoginForm
  },

  data() {
    return {
      loading: false,
      error: null
    }
  },

methods: {
  async handleLogin({ email, password }) {
    this.loading = true
    this.error = null

    try {
      const authService = await getAuthService()
      await authService.signIn(email, password)
      this.$router.push('/lista')
    } catch (err) {
      this.error = err.message || 'Erro ao fazer login'
    } finally {
      this.loading = false
    }
  }
}

}
</script>

