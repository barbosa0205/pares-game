import React from 'react'
import styles from './styles/playerCards.module.scss'
export const PlayerCards = ({ deck }) => {
    return (
        <section className={styles.playerCardsContainer}>
            {deck &&
                deck.cards.map(card => (
                    <img
                        key={card.code}
                        className={styles.card}
                        src={card.image}
                        alt={`card ${card.code}`}
                    />
                ))}
        </section>
    )
}
