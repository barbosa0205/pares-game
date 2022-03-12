import React, { useEffect, useState } from 'react'

import styles from './styles/player.module.scss'
import silhouette from '../../assets/game/silhouette.png'
import { useGame } from '../../contexts/game/useGame'
import { Timer } from '../Timer'
import { getRandomAvatar } from '../../helpers/avatars/getRandomAvatar'
import { MessageNotify } from '../MessageNotify'
import { AnswerNotify } from '../AnswerNotify'
export const Player = ({ drawACard, playerData, passTurn, ...rest }) => {
    const {
        start,
        playerInTurn,
        stopTimer,
        playerAskingAPlayer,
        setPlayerAskingAPlayer,
        playerAnswerAPlayer,
        setPlayerAnswerAPlayer,
    } = useGame()
    const [message, setMessage] = useState(null)
    const [answerMessage, setAnswerMessage] = useState(null)
    const [questionBool, setQuestionBool] = useState(false)
    const [answerBool, setAnswerBool] = useState(false)
    const [hasCard, setHasCard] = useState(false)

    const getPos = pos => {
        switch (pos) {
            case 'player2':
                return 'center-right'

            case 'player3' || 'player5':
                return 'right'
            case 'player4' || 'player6':
                return 'left'
            default:
                return 'center'
        }
    }

    useEffect(() => {
        if (!playerAnswerAPlayer) return
        if (playerAnswerAPlayer) {
            if (playerAnswerAPlayer?.sender.user_id === playerData?.user_id) {
                if (playerAnswerAPlayer.hasTheCard) {
                    setHasCard(true)
                }
                console.log(
                    'playerAnswerAPlayer',
                    playerAnswerAPlayer.sender.username
                )
                const pos = getPos(playerData?.pos)
                console.log(pos)
                setAnswerMessage({
                    ...playerAnswerAPlayer,
                    pos,
                })
                console.log(playerData.user)
            }
            setAnswerBool(true)
            setTimeout(() => {
                setAnswerBool(false)
                setPlayerAnswerAPlayer(null)
                setAnswerMessage(null)
            }, 3000)
        }
    }, [playerAnswerAPlayer])

    useEffect(() => {
        if (!playerAskingAPlayer) return
        if (playerAskingAPlayer) {
            if (playerAskingAPlayer?.sender.user_id === playerData?.user_id) {
                console.log(
                    'playerAskingAPlayer',
                    playerAskingAPlayer.sender.username
                )
                const pos = getPos(playerData?.pos)
                setMessage({
                    ...playerAskingAPlayer,
                    pos,
                })
            }
            setQuestionBool(true)
            setTimeout(() => {
                setQuestionBool(false)
                setMessage(null)
                setPlayerAskingAPlayer(null)
            }, 3000)
        }
    }, [playerAskingAPlayer])

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
                {questionBool && message && (
                    <MessageNotify position={message?.pos}>
                        <p>
                            {message.receiver.username} tienes un {message.card}
                        </p>
                    </MessageNotify>
                )}

                {answerBool && answerMessage && (
                    <AnswerNotify position={answerMessage?.pos}>
                        {!hasCard ? (
                            <p>No tengo la carta {answerMessage.card}</p>
                        ) : (
                            <p>Si tengo la carta {answerMessage.card}</p>
                        )}
                    </AnswerNotify>
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
