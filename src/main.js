/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

import { supabase } from '@/config/supabase'

const app = createApp(App)

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  console.log('User:', session?.user || null)
})

registerPlugins(app)

app.mount('#app')
