import React from 'react'
import { useUser } from '../../contexts/user/useUser'
import { Player } from '../Player'
import styles from './styles/askPlayer.module.scss'
export const AskPlayer = ({ players, closeAsk, askToPlayer }) => {
    const { user } = useUser()
    const users = players.filter(player => player.user_id !== user.user_id)
    return (
        <div className={styles.container}>
            <div className={styles.closeContainer}>
                <i onClick={() => closeAsk()}>X</i>
            </div>
            {users.map((player, index) => (
                <div key={index} className={styles.playerContainer}>
                    <Player
                        playerData={player}
                        onClick={() => {
                            askToPlayer(player.user_id)
                            closeAsk()
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
