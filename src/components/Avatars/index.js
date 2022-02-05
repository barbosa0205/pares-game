import React from 'react'
import { CreateAvatar } from '../CreateAvatar'
import styles from './styles/avatars.module.scss'
export const Avatars = () => {
    return (
        <div className={styles.avatarsContainer}>
            <h3>tambien puedes elegir un avatar</h3>
            <CreateAvatar />
        </div>
    )
}
