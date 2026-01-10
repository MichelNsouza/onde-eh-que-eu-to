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

const COLLECTION = 'reading_list'

export default {
  async getAll() {
    const db = getFirestoreDb()
    const q = query(
      collection(db, COLLECTION),
      orderBy('updated_at', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  async create(item) {
    const db = getFirestoreDb()
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...item,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    })

    return { id: docRef.id, ...item }
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
  }
}
