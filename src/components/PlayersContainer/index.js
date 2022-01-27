import React from 'react'

import styles from './styles/playersContainer.module.scss'
export const PlayersContainer = ({ children }) => {
    return <div className={styles.playersContainer}>{children}</div>
}
