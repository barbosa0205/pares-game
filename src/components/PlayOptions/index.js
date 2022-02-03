import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles/playOtions.module.scss'

export const PlayOptions = ({ setPlayModal }) => {
    const navigate = useNavigate()
    const [options, setOptions] = useState(true)
    const [createForm, setCreateForm] = useState(false)
    const [joinForm, setJoinForm] = useState(false)

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
                                    // setOptions(false)
                                    // setCreateForm(!createForm)
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
                        <h1>Unirse a Partida </h1>
                    </form>
                </>
            )}
        </section>
    )
}
