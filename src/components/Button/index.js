import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles/button.module.scss'
export const Button = ({ text, type = 'button', to, ...rest }) => {
    const navigate = useNavigate()
    return (
        <button
            className={styles.container}
            type={type}
            onClick={() => navigate(to)}
            {...rest}
        >
            {text}
        </button>
    )
}
