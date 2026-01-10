import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

let appInstance = null
let authInstance = null
let dbInstance = null

function getFirebaseApp() {
  if (!appInstance) {
    appInstance = getApps().length
      ? getApp()
      : initializeApp(firebaseConfig)

  }

  return appInstance
}

export function getFirebaseAuth() {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp())
  }

  return authInstance
}

export function getFirestoreDb() {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp())
  }

  return dbInstance
}
