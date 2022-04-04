import React from 'react'
import { useUser } from '../../contexts/user/useUser'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './styles/signinForm.module.scss'
export const SigninForm = ({ setRegister }) => {
  const {
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
    loginError,
    rememberAcount,
    setRememberAcount,
  } = useUser()

  const [loginValues, handleLoginChange, loginReset] = useForm({
    loginemail: '',
    loginpassword: '',
  })

  return (
    <>
      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input
          type='text'
          name='loginemail'
          placeholder='Correo'
          onChange={handleLoginChange}
        />
        <input
          type='password'
          name='loginpassword'
          placeholder='Contraseña'
          onChange={handleLoginChange}
        />
        {loginError && (
          <div className={styles.errorContainer}>
            <p>{loginError.error}</p>
          </div>
        )}
        <span
          className={styles.rememberAcount}
          onClick={() => setRememberAcount(!rememberAcount)}
        >
          Recordar Cuenta{' '}
          {rememberAcount ? (
            <i className='ri-checkbox-line'></i>
          ) : (
            <i className='ri-checkbox-blank-line'></i>
          )}
        </span>
        <Button
          type='submit'
          text='Inicia sesión'
          onClick={() => handleLoginWithEmailAndPassword(loginValues)}
        />
        <div className={styles.regContainer}>
          <p>
            ¿No tienes una cuenta?{' '}
            <span
              onClick={() => {
                setRegister(true)
              }}
            >
              Registrate
            </span>
          </p>
        </div>
      </form>
      <div className={styles.otherAuthContainer}>
        <p>O tambien puedes iniciar sesión con:</p>
        <div className={styles.iconsContainer}>
          <Icon className='ri-google-fill' onClick={handleLoginWithGoogle} />

          <Icon className='ri-facebook-fill' />
        </div>
      </div>

      <div className={styles.messageGoogle}>
        <p>
          <span>ADVERTENCIA:</span> Puede que el acceso desde google falle en
          telefonos moviles, se recomienda crear la cuenta con correo y
          contraseña, esta se enlaza con google si el correo es Gmail
        </p>
      </div>
    </>
  )
}
