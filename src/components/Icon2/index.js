import React from 'react'
import styles from './styles/askButton.module.scss'
export const AskButton = ({ text, players, ...rest }) => {
    return (
        <>
            <button className={styles.icon2} {...rest}>
                {text}
            </button>
        </>
    )
}
