const PROVIDER = import.meta.env.VITE_DATA_PROVIDER
// 'supabase' | 'firebase' | 'api'

let authServicePromise

switch (PROVIDER) {
  case 'firebase':
    authServicePromise = import('./firebaseAuth')
    break

  case 'api':
    authServicePromise = import('./apiAuth')
    break

  default:
    authServicePromise = import('./supabaseAuth')
}

export default async function getAuthService() {
  const module = await authServicePromise
  return module.default
}
