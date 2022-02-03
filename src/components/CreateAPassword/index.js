import React from 'react'
import { useUser } from '../../contexts/user/useUser'
import { Button } from '../Button'
import styles from './styles/createAPassword.module.scss'
export const CreateAPassword = ({ toggleMenu }) => {
    const { setIsLoggedInWithGoogle } = useUser()
    return (
        <div className={`container-column`}>
            <div className={`${styles.closeContainer}`}>
                <p
                    onClick={() => {
                        setIsLoggedInWithGoogle(false)
                        toggleMenu()
                    }}
                >
                    X
                </p>
            </div>
            <div className={styles.createPasswordContainer}>
                <h2>Crea una contraseña</h2>
                <p>
                    Al iniciar sesión con google no se le crea una contraseña
                    por lo cual no podra iniciar sesion con la opcion de correo
                    y contraseña
                </p>
                <p>
                    Al crear una contraseña tambien podria iniciar sesion con la
                    opcion de correo electronico y contraseña
                </p>
                <Button text="Crear contreaseña" />
            </div>
        </div>
    )
}
