import React, { useState } from 'react'

import styles from './styles/player.module.scss'
import silhouette from '../../assets/game/silhouette.png'
import { useGame } from '../../contexts/game/useGame'
import { Timer } from '../Timer'
import { getRandomAvatar } from '../../helpers/avatars/getRandomAvatar'
export const Player = ({ drawACard, playerData, passTurn, ...rest }) => {
    const { start, playerInTurn, stopTimer } = useGame()

    return playerData ? (
        <div className={styles.container} {...rest}>
            <article className={`${styles.playerContainer}`}>
                <img
                    className={`${
                        playerInTurn?.username === playerData?.username
                            ? styles.playerInTurn
                            : ''
                    }`}
                    src={playerData?.img || getRandomAvatar()}
                    alt={`player ${playerData.username}`}
                    title={`player ${playerData.username}`}
                />
                {playerInTurn?.username === playerData?.username && (
                    <>
                        {!stopTimer && (
                            <Timer
                                passTurn={passTurn}
                                drawACard={drawACard && true}
                            />
                        )}
                    </>
                )}
            </article>
            <p>{playerData.username}</p>
        </div>
    ) : (
        <>
            {!start && (
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
            )}
        </>
    )
}
