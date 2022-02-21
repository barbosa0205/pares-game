import React from 'react'

import styles from './styles/player.module.scss'
import silhouette from '../../assets/game/silhouette.png'
export const Player = ({ playerData }) => {
    return playerData ? (
        <article className={styles.playerContainer}>
            <img src={playerData?.img} alt="" />
        </article>
    ) : (
        <article className={styles.playerContainer}>
            <img
                src={silhouette}
                alt="silhouette"
                style={{
                    width: '5.5rem',
                    height: '5.5rem',
                }}
            />
        </article>
    )
}
