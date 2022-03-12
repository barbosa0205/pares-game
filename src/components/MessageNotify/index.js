import styles from './styles/messageNotify.module.scss'

export const MessageNotify = ({ position, children }) => {
    console.log(`asking position: ${position}`)
    return (
        <>
            <div
                className={`${styles.messageNotifyContainer} ${
                    position === 'center' ? styles.center : ''
                } position === 'left' ? styles.left : ''} ${
                    position === 'right' ? styles.right : ''
                } ${position === 'center-right' ? styles.centerRight : ''}`}
            >
                {children}
            </div>
        </>
    )
}
