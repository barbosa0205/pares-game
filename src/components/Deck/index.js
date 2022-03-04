import React from 'react'
import { Card } from '../Card'
import styles from './styles/deck.module.scss'
import BC from '../../assets/cards/card_back.png'
export const Deck = () => {
    return (
        <div className={styles.deckContainer}>
            <img src={BC} alt="back_card" />
        </div>
    )
}
