import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth'

import { auth } from '@/config/firebase'

const FirebaseAuth = {
  async signIn(email, password) {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  },

  async signUp(email, password) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  },

  async signOut() {
    await firebaseSignOut(auth)
  },

  getUser() {
    return auth.currentUser
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, user => {
      callback({ user })
    })
  }
}

export default FirebaseAuth
