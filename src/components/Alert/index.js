import React from 'react'

import styles from './styles/alert.module.scss'

export const Alert = ({ iconClass, text, close }) => {
    return (
        <div className={styles.alert}>
            <div className={styles.closeContainer}>
                <p onClick={() => close(c => !c)}>X</p>
            </div>
            <i className={iconClass}></i>
            <p>{text}</p>
        </div>
    )
}
