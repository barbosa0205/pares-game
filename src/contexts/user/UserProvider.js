import { nanoid } from 'nanoid'
import { createContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import md5 from 'md5'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '../../firebase/credentials'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getRandomAvatar } from '../../helpers/getRandomAvatar'
export const userCtxt = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [isLoggedInWithGoogle, setIsLoggedInWithGoogle] = useState(false)
    const [registerError, setRegisterError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    let userExist = null

    const isLogged = () => !!user

    const logout = () => {
        auth.signOut()
        setUser(null)
        localStorage.removeItem('user')
    }

    const userAlreadyExists = async email => {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            if (doc) {
                userExist = doc.data()
                console.log(userExist)
            }
        })
        return userExist
    }

    const handleLoginWithEmailAndPassword = async ({ email, password }) => {
        if (!email || !password) {
            setLoginError({ error: 'Correo o contraseña incorrecto' })
            return
        }
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email))
        let userExist
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            if (doc) {
                userExist = doc.data()
            }
        })

        if (userExist) {
            if (userExist.password === md5(password)) {
                localStorage.setItem('user', JSON.stringify(userExist))
                setUser(userExist)
            } else {
                setLoginError({ error: 'Correo o contraseña incorrecto ' })
            }
        } else {
            setLoginError({ error: 'Correo o contraseña incorrecto ' })
        }
    }

    const handleLoginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async res => {
                const exist = await userAlreadyExists(res.user.email)
                if (exist) {
                    setUser(userExist)
                    localStorage.setItem('user', JSON.stringify(userExist))
                } else {
                    const user = {
                        username: `${
                            res.user.displayName.split(' ')[0]
                        }-${nanoid(7)}`,
                        email: res.user.email,
                        img: res.user.photoURL,
                        user_id: nanoid(),
                        clan: '',
                        xp: 0,
                        xp_needed: 450,
                        level: 1,
                        coins: 2500,
                        gems: 50,
                    }
                    await addDoc(collection(db, 'users'), user)
                    setUser(user)
                    localStorage.setItem('user', JSON.stringify(user))
                    setIsLoggedInWithGoogle(true)
                }
            })
            .catch(err => {
                console.log('ERROR GOOGLE AUTH', err)
            })
    }

    const handleRegister = async ({ username, email, password }) => {
        if (!username) {
            setRegisterError({ error: 'Coloque un usuario' })
            return
        } else if (!email) {
            setRegisterError({ error: 'Coloque un correo' })
            return
        } else if (!password) {
            setRegisterError({ error: 'Coloque una contraseña' })
            return
        }

        if (username.length < 4) {
            setRegisterError({
                error: 'El usuario debe de contener entre 4 y 14 caracteres',
            })
            return
        }

        if (password.length < 6) {
            setRegisterError({
                error: 'La contraseña debe contener almenos 6 caracteres',
            })
            return
        }

        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email))
        let userExist
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
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

        if (!userExist) {
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('username', '==', username))
            let usernameExist
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                if (doc) {
                    usernameExist = doc.data().username
                }
            })
            console.log(usernameExist)
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
            await addDoc(collection(db, 'users'), userToRegister)
            return true
        }
    }

    useEffect(() => {
        const verifyUserInLocalStorage = async () => {
            if (localStorage.getItem('user') && !user) {
                setLoadingLogin(true)

                setUser(JSON.parse(localStorage.getItem('user')))

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
    }

    return <userCtxt.Provider value={value}>{children}</userCtxt.Provider>
}
