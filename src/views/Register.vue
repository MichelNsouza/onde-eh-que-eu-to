<template>
  <v-container>
    <RegisterForm
      :loading="loading"
      :error="error"
      @submit="handleRegister"
    />
  </v-container>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';
import getAuthService from '@/services/auth';

export default {
  name: 'Register',

  components: {
    RegisterForm
  },

  data() {
    return {
      loading: false,
      error: null
    }
  },

  methods: {
    async handleRegister({ email, password }) {
      this.loading = true
      this.error = null

      try {
        const authService = await getAuthService()
        await authService.signUp(email, password)
        this.$router.push('/login')
      } catch (err) {
        this.error = err.message || 'Erro ao criar conta'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
