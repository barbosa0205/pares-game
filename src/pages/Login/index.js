import React from 'react'
import { Icon } from '../../components/Icon'
import { useNavigate } from 'react-router-dom'
import styles from './styles/login.module.scss'
import { useForm } from '../../hooks/useForm'
import { useUser } from '../../contexts/user/useUser'

export const LoginPage = () => {
    const navigate = useNavigate()
    const { handleLoginWithGoogle, loadingLogin } = useUser()
    const { values, handleInputChange, reset } = useForm({
        username: '',
        password: '',
    })
    return (
        <>
            {loadingLogin ? (
                <section className={styles.loginContainer}>
                    <h2>CARGANDO...</h2>
                </section>
            ) : (
                <section className={styles.loginContainer}>
                    <h1>Inicia Sesión</h1>

                    <div className={styles.otherAuthContainer}>
                        <div className={styles.iconsContainer}>
                            <Icon
                                className="ri-google-fill"
                                onClick={handleLoginWithGoogle}
                            />

                            <Icon className="ri-facebook-fill" />
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
