import React from 'react'
import styles from './styles/alertBox.module.scss'
export const AlertBox = ({ children }) => {
    return <article className={styles.alertBox}>{children}</article>
}
