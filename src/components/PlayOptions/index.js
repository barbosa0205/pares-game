import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/user/useUser'
import { Button } from '../Button'
import styles from './styles/playOtions.module.scss'
import { useForm } from '../../hooks/useForm'
export const PlayOptions = ({ setPlayModal }) => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const [options, setOptions] = useState(true)
    const [createForm, setCreateForm] = useState(false)
    const [joinForm, setJoinForm] = useState(false)

    const [formValue, handleInputChange] = useForm({
        code: '',
    })

    return (
        <section className={styles.playOtionsContainer}>
            <div className={styles.closeContainer}>
                <p onClick={() => setPlayModal(m => !m)}>X</p>
            </div>
            {options && (
                <>
                    <h2>¿Que quieres hacer?</h2>
                    <div className={styles.optionsContainer}>
                        <div className={styles.optionContainer}>
                            <i
                                className="fas fa-pencil-ruler"
                                onClick={() => {
                                    setUser({
                                        ...user,
                                        role: 'creator',
                                    })
                                    navigate(`/game/${nanoid()}`)
                                }}
                            ></i>
                            <p>Crear partida</p>
                        </div>
                        <div className={styles.optionContainer}>
                            <i
                                className={`fas fa-reply-all`}
                                onClick={() => {
                                    setOptions(false)
                                    setJoinForm(!joinForm)
                                }}
                            ></i>
                            <p>unirse a partida</p>
                        </div>
                    </div>
                </>
            )}
            {createForm && (
                <>
                    <div className={styles.backContainer}>
                        <i
                            className="ri-arrow-left-line"
                            onClick={() => {
                                setOptions(true)
                                setJoinForm(false)
                                setCreateForm(false)
                            }}
                        ></i>
                    </div>
                    <form>
                        <h1>Crear Partida </h1>
                    </form>
                </>
            )}
            {joinForm && (
                <>
                    <div className={styles.backContainer}>
                        <i
                            className="ri-arrow-left-line"
                            onClick={() => {
                                setOptions(true)
                                setJoinForm(false)
                                setCreateForm(false)
                            }}
                        ></i>
                    </div>
                    <form>
                        <h1>PEGA AQUI EL CODIGO DE LA SALA</h1>
                        <input
                            className={styles.inputCode}
                            type="text"
                            name="code"
                            placeholder="EJ: W&K120520IL0V3jr0205 "
                            onChange={handleInputChange}
                        />
                        <Button
                            text={'UNIRSE'}
                            onClick={() => {
                                setUser({
                                    ...user,
                                    role: 'player',
                                })
                                navigate(`/game/${formValue.code}`)
                            }}
                        />
                    </form>
                </>
            )}
        </section>
    )
}
