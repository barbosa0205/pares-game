import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/credentials'

export const getIdByUserID = async (id) => {
  let idu
  const userRef = collection(db, 'users')
  const q = query(userRef, where('user_id', '==', id))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    idu = doc.id
  })

  return idu
}

export const userAlreadyExists = async (username) => {
  let userExist
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('username', '==', username))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    userExist = doc.data()
  })

  return userExist?.username
}

export const getUserByEmail = async (email) => {
  let user
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('email', '==', email))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    user = doc.data()
  })

  return user
}
export const getUserByUserId = async (user_id) => {
  let user
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('user_id', '==', user_id))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    user = doc.data()
  })

  return user
}
