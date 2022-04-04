import React from 'react'
import { Card } from '../Card'
import styles from './styles/deck.module.scss'
import BC from '../../assets/cards/card_back.png'
import { useGame } from '../../contexts/game/useGame'
export const Deck = () => {
  const { numberOfCardsInDeck } = useGame()
  return (
    <div className={styles.deckContainer}>
      <img className='card' src={BC} alt='back_card' />
      <span>{numberOfCardsInDeck}</span>
    </div>
  )
}
