import React from 'react'
import { Card } from '../Card'
import styles from './styles/snatchCard.module.scss'
import flippedCard from '../../assets/cards/card_back.png'
import { useGame } from '../../contexts/game/useGame'
export const SnatchCard = ({ data }) => {
    const { playerInTurn } = useGame()
    return (
        data && (
            <div className={styles.container}>
                <img
                    src={data.sender.img}
                    alt={data.sender.username + 'profile'}
                />
                <p>{data.sender.username}</p>
                <h3>Elige una carta</h3>
                <div className={styles.cardsContainer}>
                    {data.contrincantDeck.cards.map(card => (
                        <img
                            key={card.code}
                            src={flippedCard}
                            alt="flipped card"
                        />
                    ))}
                </div>
            </div>
        )
    )
}
