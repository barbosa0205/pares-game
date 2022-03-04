import React from 'react'
import { useGame } from '../../contexts/game/useGame'
import { useUser } from '../../contexts/user/useUser'

import styles from './styles/card.module.scss'

export const Card = ({ card }) => {
    const { cardSelected, setCardSelected, playerInTurn, askedCardValue } =
        useGame()
    const { user } = useUser()
    return (
        <img
            className={`
            ${styles.card} 
            ${
                cardSelected?.code === card?.code &&
                playerInTurn.username === user.username &&
                styles.selected
            }
            ${askedCardValue === card?.value && styles.asked}
            ${!askedCardValue && styles.hover}`}
            src={card?.image}
            alt={`card ${card?.code}`}
            onClick={() => {
                setCardSelected(card)
            }}
        />
    )
}
