import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

import { getFirestoreDb } from '@/config/firebase'
import { getAuth, signOut } from 'firebase/auth'

const COLLECTION = 'reading_list'

const FirebaseReadingListRepository = {
  async getAll() {
    const db = getFirestoreDb()
    const q = query(
      collection(db, COLLECTION),
      orderBy('updated_at', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }))
  },

  async create(item) {
    const db = getFirestoreDb()

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...item,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    })

    return {
      id: docRef.id,
      ...item
    }
  },

  async update(id, updates) {
    const db = getFirestoreDb()
    const ref = doc(db, COLLECTION, id)

    await updateDoc(ref, {
      ...updates,
      updated_at: serverTimestamp()
    })
  },

  async delete(id) {
    const db = getFirestoreDb()
    await deleteDoc(doc(db, COLLECTION, id))
    return true
  },

  async logout() {
    const auth = getAuth()

    try {
      await signOut(auth)
    } catch (error) {
      console.error('Erro ao deslogar (Firebase):', error)
      throw error
    }
  },

  async incrementCapitulo(id, currentValue) {
    return this.update(id, { capitulo: currentValue + 1 })
  },

  async decrementCapitulo(id, currentValue) {
    if (currentValue > 1) {
      return this.update(id, { capitulo: currentValue - 1 })
    }
    return null
  }
}

export default FirebaseReadingListRepository
