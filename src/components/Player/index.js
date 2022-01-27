import React from 'react'

import styles from './styles/player.module.scss'

export const Player = player => {
    return (
        <article
            className={styles.playerContainer}
            style={{
                gridArea: player,
            }}
        >
        
        </article>
    )
}
