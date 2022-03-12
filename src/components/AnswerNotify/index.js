import React from 'react'
import styles from './styles/answerNotify.module.scss'
export const AnswerNotify = ({ position, children }) => {
    return (
        <>
            <div
                className={`${styles.messageNotifyContainer} ${
                    position === 'center' ? styles.center : ''
                } ${position === 'left' ? styles.left : ''} ${
                    position === 'right' ? styles.right : ''
                } ${position === 'center-right' ? styles.centerRight : ''}`}
            >
                {children}
            </div>
        </>
    )
}
