import React, { useEffect, useState } from 'react'
import { Icon } from '../../components/Icon'
import { useNavigate } from 'react-router-dom'
import styles from './styles/login.module.scss'
import { useForm } from '../../hooks/useForm'
import { useUser } from '../../contexts/user/useUser'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Alert } from '../../components/Alert'

export const LoginPage = () => {
    const navigate = useNavigate()
    const {
        handleLoginWithEmailAndPassword,
        handleLoginWithGoogle,
        loadingLogin,
        handleRegister,
        loginError,
        registerError,
    } = useUser()

    const [loginValues, handleLoginChange, LoginReset] = useForm({
        loginemail: '',
        loginpassword: '',
    })

    const [registerValues, handleRegisterChange, RegisterReset] = useForm({
        email: '',
        password: '',
        username: '',
    })
    const [register, setRegister] = useState(false)
    const [registerAlert, setRegisterAlert] = useState(false)

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
                                    const RegisterSucces = await handleRegister(
                                        registerValues
                                    )

                                    setRegisterAlert(RegisterSucces)
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
                                            //TODO: reset form
                                        }}
                                    >
                                        Inicia sesión
                                    </span>
                                </p>
                            </div>
                        </form>
                    ) : (
                        <form
                            className={styles.formContainer}
                            onSubmit={e => {
                                e.preventDefault()
                            }}
                        >
                            <input
                                type="text"
                                name="loginemail"
                                placeholder="Correo"
                                onChange={handleLoginChange}
                            />
                            <input
                                type="password"
                                name="loginpassword"
                                placeholder="Contraseña"
                                onChange={handleLoginChange}
                            />
                            {loginError && (
                                <div className={styles.errorContainer}>
                                    <p>{loginError.error}</p>
                                </div>
                            )}
                            <Button
                                type="submit"
                                text="Inicia sesión"
                                onClick={() =>
                                    handleLoginWithEmailAndPassword(loginValues)
                                }
                            />
                            <div className={styles.regContainer}>
                                <p>
                                    ¿No tienes una cuenta?{' '}
                                    <span
                                        onClick={() => {
                                            setRegister(true)
                                            //TODO: reset form
                                        }}
                                    >
                                        Registrate
                                    </span>
                                </p>
                            </div>
                        </form>
                    )}

                    {!register && (
                        <>
                            <div className={styles.otherAuthContainer}>
                                <p>O tambien puedes iniciar sesión con:</p>
                                <div className={styles.iconsContainer}>
                                    <Icon
                                        className="ri-google-fill"
                                        onClick={handleLoginWithGoogle}
                                    />

                                    <Icon className="ri-facebook-fill" />
                                </div>
                            </div>

                            <div className={styles.messageGoogle}>
                                <p>
                                    <span>ADVERTENCIA:</span> Puede que el
                                    acceso desde google falle en telefonos
                                    moviles, se recomienda crear la cuenta con
                                    correo y contraseña, esta se enlaza con
                                    google si el correo es Gmail
                                </p>
                            </div>
                        </>
                    )}
                    {registerAlert && (
                        <Modal blur={false}>
                            <Alert
                                text={'Registro exitoso'}
                                iconClass={'ri-checkbox-circle-fill'}
                                close={setRegisterAlert}
                            />
                        </Modal>
                    )}
                </section>
            )}
        </>
    )
}
