import { nanoid } from 'nanoid'
import { createContext, useEffect, useState } from 'react'
import md5 from 'md5'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, db } from '../../firebase/credentials'
import {
  addDoc,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { getRandomAvatar } from '../../helpers/avatars/getRandomAvatar'
import { getError } from '../../helpers/loginErrors'
import { registerErrors } from '../../helpers/registerErrors'
import { getUserByEmail, getUserByUserId } from '../../helpers/get'
export const userCtxt = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [isLoggedInWithGoogle, setIsLoggedInWithGoogle] = useState(false)
  const [registerError, setRegisterError] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [rememberAcount, setRememberAcount] = useState(false)
  let userExist = null

  const isLogged = () => !!user

  const logout = () => {
    auth.signOut()
    setUser(null)
    localStorage.removeItem('user')
  }

  const userAlreadyExists = async (email) => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc) {
        userExist = doc.data()
      }
    })
    return userExist
  }

  const handleLoginWithEmailAndPassword = async ({
    loginemail,
    loginpassword,
  }) => {
    setLoginError(null)
    signInWithEmailAndPassword(auth, loginemail, loginpassword)
      .then(async () => {
        const obtainedUser = await getUserByEmail(loginemail)
        if (rememberAcount) {
          localStorage.setItem(
            'user',
            JSON.stringify({ user_id: obtainedUser.user_id })
          )
        }
        setUser(obtainedUser)
      })
      .catch((error) => {
        console.log(error.code)
        const errorCode = getError(error.code)
        setLoginError({ error: errorCode })
        console.log(errorCode)
      })
  }

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (res) => {
        let uid = auth.currentUser.uid
        const exist = await userAlreadyExists(res.user.email)
        if (exist) {
          setUser(userExist)
          //   localStorage.setItem(
          //     'user',
          //     JSON.stringify({ ...userExist, password: 'shhh...' })
          //   )
        } else {
          const user = {
            username: `${res.user.displayName.split(' ')[0]}-${nanoid(7)}`,
            email: res.user.email,
            img: getRandomAvatar(),
            user_id: nanoid(),
            clan: '',
            xp: 0,
            xp_needed: 450,
            level: 1,
            coins: 2500,
            gems: 50,
          }
          const userRef = collection(db, 'users')

          await setDoc(doc(userRef, uid), user)
          await addDoc(collection(db, 'users'), user)
          setUser(user)
          //   localStorage.setItem(
          //     'user',
          //     JSON.stringify({ user_id: user.user_id })
          //   )
          setIsLoggedInWithGoogle(true)
        }
      })
      .catch((err) => {
        console.log('ERROR GOOGLE AUTH', err)
      })
  }

  const handleRegister = async ({ username, email, password }, close) => {
    let uid
    setRegisterError(null)
    if (!username) {
      setRegisterError({ error: 'Coloque un usuario' })
      return
    }

    if (username.length < 4) {
      setRegisterError({
        error: 'El usuario debe de contener entre 4 y 14 caracteres',
      })
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const usersRef = collection(db, 'users')
        uid = auth.currentUser.uid
        console.log(uid)
        const q = query(usersRef, where('username', '==', username))
        let usernameExist
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          if (doc) {
            usernameExist = doc.data().username
          }
        })
        if (usernameExist) {
          setRegisterError({
            error: 'este usuario ya esta en uso',
          })
          return
        }

        const userToRegister = {
          username,
          password: md5(password),
          email,
          img: getRandomAvatar(),
          user_id: nanoid(),
          clan: '',
          xp: 0,
          xp_needed: 450,
          level: 1,
          coins: 2500,
          gems: 50,
        }

        const userRef = collection(db, 'users')

        await setDoc(doc(userRef, uid), userToRegister)
        close((c) => !c)
      })
      .catch((error) => {
        const errorCode = registerErrors(error.code)
        console.log(error.code)
        setRegisterError({ error: errorCode })
      })

    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))
    let userExist
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc) {
        userExist = doc.data().email
      }
    })

    if (userExist) {
      setRegisterError({
        error: 'este correo ya esta registrado con otro usuario',
      })
      return
    }
  }

  useEffect(() => {
    const verifyUserInLocalStorage = async () => {
      if (localStorage.getItem('user') && !user) {
        setLoadingLogin(true)
        const userId = JSON.parse(localStorage.getItem('user')).user_id
        const obtainedUser = await getUserByUserId(userId)
        setUser({ ...obtainedUser, password: 'shhh...' })
        setLoadingLogin(false)
      }
    }
    verifyUserInLocalStorage()
    if (user) {
      if (!user.password) {
        setIsLoggedInWithGoogle(true)
      }
    }
  }, [user])

  const value = {
    user,
    setUser,
    isLogged,
    logout,
    handleLoginWithGoogle,
    isLoggedInWithGoogle,
    setIsLoggedInWithGoogle,
    loadingLogin,
    handleLoginWithEmailAndPassword,
    handleRegister,
    loginError,
    registerError,
    rememberAcount,
    setRememberAcount,
  }

  return <userCtxt.Provider value={value}>{children}</userCtxt.Provider>
}
