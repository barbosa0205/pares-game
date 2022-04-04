import React from 'react'
import styles from './styles/cards.module.scss'
import cardsBack from '../../assets/cards/cards_back.png'
import { useGame } from '../../contexts/game/useGame'
export const Cards = ({ playerId }) => {
  const { playersCardsQty, setPlayersCardsQty } = useGame()
  const [cardsLength, setCardsLength] = React.useState(0)

  React.useEffect(() => {
    if (!playersCardsQty) return
    const player = playersCardsQty.find((player) => player.user_id === playerId)
    if (!player) return
    console.log(player.cardsQty)
    setCardsLength(player.cardsQty)
    setPlayersCardsQty([])
  }, [playersCardsQty])

  return (
    <div className={styles.cardsContainer}>
      <img src={cardsBack} alt='cards-back' />
      <span>{cardsLength ? cardsLength : ''}</span>
    </div>
  )
}
