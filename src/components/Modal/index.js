import React from 'react'

import styles from './styles/modal.module.scss'

export const Modal = ({ children, blur = true, paddingTop }) => {
    return (
        <div
            style={{
                paddingTop: paddingTop ? paddingTop : '0',
            }}
            className={`${styles.modal} ${blur && styles.blur}`}
        >
            {children}
        </div>
    )
}
