import React from 'react'

import styles from './styles/playerContainer.module.scss'

export const PlayerContainer = ({ children, pos }) => {
    return (
        <div
            className={styles.container}
            style={{
                gridArea: pos,
            }}
        >
            {children}
        </div>
    )
}
