import React from 'react'
import { Card } from '../Card'
import styles from './styles/deck.module.scss'

export const Deck = ({ deck, setDeck }) => {
    return (
        <div className={styles.deckContainer}>
            <Card />
        </div>
    )
}
