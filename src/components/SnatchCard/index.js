import { React, useEffect, useRef, useState } from 'react'
import styles from './styles/snatchCard.module.scss'
import flippedCard from '../../assets/cards/card_back.png'
import { useGame } from '../../contexts/game/useGame'
import { useSocket } from '../../contexts/socket/useSocket'
import { Modal } from '../Modal'
import { Timer } from '../Timer'
export const SnatchCard = ({ data, setSnatchCard }) => {
  const { setPassTurnState, playerDeck, setPlayerDeck, receiver } = useGame()
  const { socket } = useSocket()
  const [flipped, setFlipped] = useState(false)
  const [cardValue, setCardValue] = useState({})

  const choseCard = (card) => {
    setCardValue(card)
    setFlipped(true)
    setTimeout(() => {
      setFlipped(false)
      setPassTurnState(true)
      const cards = playerDeck.cards
      cards.push(card)
      setPlayerDeck({ ...playerDeck, cards })
      setTimeout(() => {
        setSnatchCard(false)
      }, 500)
    }, 2000)

    socket.emit('snatchCard', {
      card: data.card,
      cardValue: card,
      receiver,
      sender: data.receiver,
    })
  }

  return (
    data && (
      <div className={styles.container}>
        <img src={data.sender.img} alt={data.sender.username + 'profile'} />
        <p>{data.sender.username}</p>
        <h3>Elige una carta</h3>
        <Timer
          timerStyle='responseCardAlert'
          time={10}
          snatchCardTimer={true}
        />
        <div className={styles.cardsContainer}>
          {data.contrincantDeck.cards.map((card) => (
            <img
              key={card.code}
              className={`${styles.card} ${
                cardValue.value === card.value && flipped && styles.cardSelected
              }`}
              src={flippedCard}
              alt='flipped card'
              onClick={() => choseCard(card)}
            />
          ))}
        </div>
        {/* {flipped && (
                    <Modal>
                        <img
                            className={`${styles.showCard}`}
                            src={cardValue.image}
                            alt={cardValue.value}
                        />
                    </Modal>
                )} */}
        {flipped && (
          <Modal>
            <img
              className={`${styles.showCard}`}
              src={cardValue.image}
              alt={cardValue.value}
            />
          </Modal>
        )}
      </div>
    )
  )
}
