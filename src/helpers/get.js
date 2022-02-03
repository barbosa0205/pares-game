import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/credentials'

export const getIdByUserID = async id => {
    let idu
    const userRef = collection(db, 'users')
    const q = query(userRef, where('user_id', '==', id))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => {
        idu = doc.id
    })

    return idu
}

export const userAlreadyExists = async username => {
    let userExist
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        if (doc) {
            userExist = doc.data()
        }
    })
    return userExist
}
