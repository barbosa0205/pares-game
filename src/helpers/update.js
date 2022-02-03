import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/credentials'

export const updateUserById = async (id, dataToUpdate) => {
    updateDoc(doc(db, 'users', id), dataToUpdate)
}
