import React from 'react'

import styles from './styles/modal.module.scss'

export const Modal = ({ children, blur = true }) => {
    return (
        <div className={`${styles.modal} ${blur && styles.blur}`}>
            {children}
        </div>
    )
}
