import React, { useEffect, useState } from 'react'

import styles from './styles/login.module.scss'

import { useUser } from '../../contexts/user/useUser'

import { SignupForm } from '../../components/signupForm'
import { SigninForm } from '../../components/SigninForm'

export const LoginPage = () => {
    const { loadingLogin } = useUser()

    const [register, setRegister] = useState(false)

    return (
        <>
            {loadingLogin ? (
                <section className={styles.loginContainer}>
                    <h2>CARGANDO...</h2>
                </section>
            ) : (
                <section className={styles.loginContainer}>
                    {!register ? <h1>Inicia Sesión</h1> : <h1>Registrate</h1>}
                    {register ? (
                        <SignupForm setRegister={setRegister} />
                    ) : (
                        <SigninForm setRegister={setRegister} />
                    )}
                </section>
            )}
        </>
    )
}
