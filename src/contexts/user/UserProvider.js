import { nanoid } from 'nanoid'
import { createContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../firebase/credentials'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
export const userCtxt = createContext()

export const UserProvider = ({ children }) => {
    // const [user, setUser] = useState({
    //     id: nanoid(),
    //     user: 'wicho',
    //     password: '123',
    //     email: 'wicho@gmail.com',
    // })
    const [user, setUser] = useState(null)
    const [loadingLogin, setLoadingLogin] = useState(false)
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

    const handleLoginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async res => {
                const exist = await userAlreadyExists(res.user.email)
                console.log(exist)
                if (exist) {
                    setUser(userExist)
                    localStorage.setItem(
                        'user',
                        JSON.stringify(userExist.email)
                    )
                } else {
                    const user = {
                        username: `${
                            res.user.displayName.split(' ')[0]
                        }-${nanoid(5)}`,
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
                }
            })
            .catch(err => {
                console.log('ERROR GOOGLE AUTH', err)
            })
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
    }, [user])

    const value = {
        user,
        isLogged,
        logout,
        handleLoginWithGoogle,
        loadingLogin,
    }

    return <userCtxt.Provider value={value}>{children}</userCtxt.Provider>
}
