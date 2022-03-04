import React from 'react'
import { Card } from '../Card'
import styles from './styles/playerCards.module.scss'
export const PlayerCards = ({ deck }) => {
    return (
        <section className={styles.playerCardsContainer}>
            <i className={`${styles.leftArrow} ri-arrow-left-s-line`}></i>
            {deck &&
                deck.cards.map(card => <Card key={card?.code} card={card} />)}
            <i className={`${styles.rightArrow} ri-arrow-right-s-line`}></i>
        </section>
    )
}
