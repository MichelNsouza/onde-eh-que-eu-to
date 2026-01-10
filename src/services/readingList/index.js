import ApiReadingListRepository from './apiRepository'
import FirebaseReadingListRepository from './firebaseRepository'
import SupabaseReadingListRepository from './supabaseRepository'

const PROVIDER = import.meta.env.VITE_DATA_PROVIDER
// 'supabase' | 'firebase' | 'api'

let repository

switch (PROVIDER) {
  case 'firebase':
    repository = FirebaseReadingListRepository
    break
  case 'api':
    repository = ApiReadingListRepository
    break
  default:
    repository = SupabaseReadingListRepository
}

export default repository
