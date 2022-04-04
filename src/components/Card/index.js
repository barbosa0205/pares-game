import React from 'react'
import { useGame } from '../../contexts/game/useGame'
import { useUser } from '../../contexts/user/useUser'
import { useSpring, animated, config } from '@react-spring/web'
import styles from './styles/card.module.scss'

export const Card = ({ card }) => {
  const {
    cardSelected,
    setCardSelected,
    playerInTurn,
    askedCardValue,
    cardCanNotBeSelected,
  } = useGame()
  const { user } = useUser()

  const props = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },

    config: config.gentle,
  })

  return (
    <animated.img
      style={props}
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
        if (!cardCanNotBeSelected) {
          setCardSelected(card)
        }
      }}
    />
  )
}
