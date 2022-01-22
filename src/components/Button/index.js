import React from 'react'
import styles from './styles/button.module.scss'
export const Button = ({ text, type = 'button', ...rest }) => {
    return (
        <button className={styles.container} type={type} {...rest}>
            {text}
        </button>
    )
}
