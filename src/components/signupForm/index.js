import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/user/useUser'
import { useForm } from '../../hooks/useForm'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { Modal } from '../Modal'
import styles from './styles/signupForm.module.scss'
export const SignupForm = ({ setRegister }) => {
    const { handleRegister, registerError } = useUser()
    const [registerValues, handleRegisterChange, registerReset] = useForm({
        email: '',
        password: '',
        username: '',
    })
    const [registerAlert, setRegisterAlert] = useState(false)

    useEffect(() => {
        return () => {}
    }, [])

    return (
        <>
            <form
                className={styles.formContainer}
                onSubmit={e => {
                    e.preventDefault()
                }}
            >
                <input
                    type="text"
                    name="email"
                    placeholder="Correo"
                    onChange={handleRegisterChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleRegisterChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleRegisterChange}
                />
                <Button
                    type="submit"
                    text="Registrate"
                    onClick={async () => {
                        handleRegister(registerValues, setRegisterAlert)
                    }}
                />
                {registerError && (
                    <div className={styles.errorContainer}>
                        <p>{registerError.error}</p>
                    </div>
                )}
                <div className={styles.regContainer}>
                    <p>
                        Ya tienes una cuenta?{' '}
                        <span
                            onClick={() => {
                                setRegister(false)
                            }}
                        >
                            Inicia sesión
                        </span>
                    </p>
                </div>
            </form>
            {registerAlert && (
                <Modal blur={false}>
                    <Alert
                        text={`Registro exitoso, ya puedes iniciar sesión`}
                        iconClass={'ri-checkbox-circle-fill'}
                        close={setRegisterAlert}
                    />
                </Modal>
            )}
        </>
    )
}
