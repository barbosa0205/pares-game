import React, { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { gsap } from 'gsap'
import { Deck } from '../../components/Deck'
import { Pairs } from '../../components/Pairs'
import { PlayerCards } from '../../components/PlayerCards'
import styles from './styles/game.module.scss'
import { useUser } from '../../contexts/user/useUser'
import { useGame } from '../../contexts/game/useGame'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from '../../components/Modal'
import { PlayerContainer } from '../../components/PlayerContainer'
import { Player } from '../../components/Player'
import { Button } from '../../components/Button'
import { AlertBox } from '../../components/AlertBox'
import { useSocket } from '../../contexts/socket/useSocket'
import { useMenu } from '../../hooks/useMenu'
import { AskButton } from '../../components/Icon2'
import { AskPlayer } from '../../components/AskPlayer'
import { SnatchCard } from '../../components/SnatchCard'
import { Timer } from '../../components/Timer'
import { PlayerNotify } from '../../components/PlayerNotify'
import { EndGameScreen } from '../../components/EndGameScreen'
import { AlertNotify } from './AlertNotify'

export const GamePage = () => {
  const navigate = useNavigate()
  const { socket } = useSocket()
  const params = useParams()
  const { user, setUser } = useUser()

  const {
    start,
    startGame,
    xpEarned,
    setXpEarned,
    coinsEarned,
    setCoinsEarned,
    generateDeckOfCards,
    drawCards,
    drawACard,
    checkIfPlayerHaveAPair,
    checkIfPlayerNoHaveCards,
    playerInTurn,
    setPlayerInTurn,
    setStart,
    cardSelected,
    setCardSelected,
    playerDeck,
    setPlayerDeck,
    hasCardMenu,
    setHasCardMenu,
    setAskedCardValue,
    setStopTimer,
    cardAskedFor,
    setCardAskedFor,
    answerIfPlayerHasCard,
    hasACard,
    setHasACard,
    passTurnState,
    setPassTurnState,
    drawCardForTimerState,
    setDrawCardForTimerState,
    setPlayerAskingAPlayer,
    setPlayerAnswerAPlayer,
    setReceiver,
    playersCardsQty,
    setPlayersCardsQty,
    removePlayer,
    setRemovePlayer,
    players,
    setPlayers,
    setCardCanNotBeSelected,
    numberOfCardsInDeck,
    setNumberOfCardsInDeck,
  } = useGame()

  const room = params.gameId
  const [party, setParty] = useState({})
  const [alertPlayerStart, setAlertPlayerStart] = useState(false)

  const [askPlayerForCardMenu, toggleAskPlayerForCardMenu] = useMenu(false)

  const [playerJoined, setPlayerJoined] = useState(null)
  const [cardAskMenu, setCardAskMenu] = useState(false)
  const [cardAskMenuValues, setCardAskMenuValues] = useState(null)
  const [roomFull, setRoomFull] = useState(false)
  const [snatchCard, setSnatchCard] = useState(null)

  const [playerResponseCard, setPlayerResponseCard] = useState(null)
  const [playerResponseMenu, setPlayerResponseMenu] = useState(false)

  const [nextPlayerState, setNextPlayerState] = useState(null)

  const [drawCardState, setDrawCardState] = useState(false)
  const [cardSnatched, setCardSnatched] = useState(null)
  const [cardSnatchedMenu, setCardSnatchedMenu] = useState(false)
  const [winner, setWinner] = useState('')
  const [playerCardsQtyState, setPlayerCardsQtyState] = useState(null)
  const [changeRole, setChangeRole] = useState(false)
  const [alertMissPlayers, setAlertMissPlayers] = useState(false)
  const initGame = async () => {
    if (!user || playerDeck) {
      return
    }
    const deck = await generateDeckOfCards()
    socket.emit('startGame', { deck, pos: 1 })
  }

  const getRandomPlayerToOpenTheWater = () => {
    socket.emit('getRandomPlayerToOpenTheWater', party)
  }

  const askPlayers = () => {
    if (!cardSelected) {
      return
    }
    if (party.players.length === 2) {
      setCardSelected(null)
      setCardCanNotBeSelected(true)
      setStopTimer(true)
      socket.emit('stopTimer')
      const mainuser = party.players.find((p) => p.user_id === user.user_id)
      const receiver = party.players.find((p) => p.user_id !== user.user_id)
      setReceiver(receiver)
      socket.emit('askPlayer', {
        sender: mainuser,
        receiver: receiver,
        card: cardSelected.value,
      })
    } else {
      toggleAskPlayerForCardMenu()
    }
  }

  const askToPlayer = (playerId) => {
    setCardSelected(null)
    setCardCanNotBeSelected(true)
    setStopTimer(true)
    socket.emit('stopTimer')
    const mainuser = party.players.find((p) => p.user_id === user.user_id)
    const receiver = party.players.find((p) => p.user_id === playerId)
    console.log('receiver', receiver.username)
    setReceiver(receiver)
    socket.emit('askPlayer', {
      sender: mainuser,
      receiver,
      card: cardSelected.value,
    })
  }

  const askForCard = () => {
    const hasTheCard = playerDeck.cards.find(
      (pcard) => pcard.value === cardAskedFor.card
    )

    setHasACard(hasTheCard)
    setCardAskMenuValues({
      sender: cardAskedFor.sender.username,
      card: cardAskedFor.card,
    })

    setCardAskMenu(true)
    setTimeout(() => {
      setCardAskMenu(false)
      setAskedCardValue(cardAskedFor.card)
      setHasCardMenu(true)
    }, 2000)
  }

  const addCardInDeck = async (deck_id) => {
    const newCard = await drawACard(deck_id)

    setPlayerDeck({
      ...playerDeck,
      cards: [...playerDeck.cards, newCard.cards[0]],
    })
  }

  const passTurn = () => {
    setCardCanNotBeSelected(false)
    const socketOfPlayerInTurn = playerInTurn.socketId
    socket.emit('passTurn', socketOfPlayerInTurn)
  }

  const drawingACard = async () => {
    const playerInTurnUsername = playerInTurn.username
    const userUsername = user.username
    if (playerInTurnUsername === userUsername) {
      const newCard = await drawACard(playerDeck.deck_id)
      setPlayerDeck({
        ...playerDeck,
        cards: [...playerDeck.cards, newCard.cards[0]],
      })
      passTurn()
    }
    setDrawCardForTimerState(false)
  }

  useEffect(() => {
    if (!changeRole) return
    setUser({ ...user, role: 'creator' })
    setChangeRole(false)
  }, [changeRole])

  useEffect(() => {
    if (!playerCardsQtyState) return
    const players = playersCardsQty.map((player) => player.user_id)
    if (players.includes(playerCardsQtyState.user_id)) {
      const player = playersCardsQty.find(
        (player) => player.user_id === playerCardsQtyState.user_id
      )
      const index = playersCardsQty.indexOf(player)
      console.log(index)
      playersCardsQty[index].cardsQty = playerCardsQtyState.cardsQty
      setPlayerCardsQtyState(null)
    } else {
      setPlayersCardsQty([...playersCardsQty, playerCardsQtyState])
      setPlayerCardsQtyState(null)
    }
  }, [playerCardsQtyState])

  useEffect(() => {
    const card = document.querySelector('.card')
    gsap.from(card, {
      opacity: 0,
      duration: 1,
    })
  }, [])

  useEffect(() => {
    if (start) {
      return
    }
    if (!start) {
      setStopTimer(true)
      setPassTurnState(false)
    }
  }, [start])

  useEffect(() => {
    if (!changeRole) return
    if (user.role === 'player') {
      setUser({ ...user, role: 'creator' })
      setChangeRole(false)
    }
  }, [changeRole])

  useEffect(() => {
    if (!cardSnatched) return
    if (cardSnatched) {
      const cards = playerDeck.cards.filter(
        (card) => card.value !== cardSnatched.cardValue.value
      )
      console.log('cards: ' + cards.map((card) => card.value))
      setCardSnatchedMenu(true)
      setTimeout(() => {
        setCardSnatchedMenu(false)
      }, 2000)
      setTimeout(() => {
        setPlayerDeck({
          ...playerDeck,
          cards,
        })
        setCardSnatched(null)
      }, 2000)
    }
  }, [cardSnatched])

  useEffect(() => {
    if (drawCardForTimerState) {
      drawingACard()
    }
  }, [drawCardForTimerState])

  useEffect(() => {
    if (drawCardState) {
      addCardInDeck(playerDeck.deck_id)
      setDrawCardState(false)
    }
  }, [drawCardState])

  useEffect(() => {
    if (nextPlayerState) {
      const next = party.players.find(
        (player) => player.socketId === nextPlayerState.socketId
      )
      setPlayerInTurn(next)
      setNextPlayerState(null)
    }
  }, [nextPlayerState])

  useEffect(() => {
    if (!passTurnState) return
    passTurn()
    setPassTurnState(false)
  }, [passTurnState])

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      if (user.role) {
        if (!user.inRoom) {
          socket.emit('join', {
            room: room,
            user_id: user.user_id,
            username: user.username,
            img: user.img,
            role: user.role,
          })
          socket.emit('playerAlrightJoin', room)
          setUser({ ...user, inRoom: true })
        } else {
          navigate('/')
        }
      }
    }

    return () => {
      setParty({})
      setPlayers([])
      setStart(false)
      setPlayerInTurn(null)
      setCardSelected({})
      setPlayerDeck(null)
      setAskedCardValue(null)
      setStopTimer(true)
      setHasCardMenu(false)
      toggleAskPlayerForCardMenu()
      setCardAskedFor({})
      setCardAskMenu(false)
      setCardAskMenuValues(null)
      setHasACard(null)
      setRoomFull(false)
      setSnatchCard(null)
      setPlayerResponseMenu(false)
      user && setUser({ ...user, inRoom: false })
      socket.emit('leaveRoom', {
        user_id: user?.user_id,
        room: room,
        username: user?.username,
      })
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    if (Object.keys(cardAskedFor).length > 0) {
      askForCard()
    }
  }, [cardAskedFor])

  useEffect(() => {
    if (playerDeck) {
      const playerCardsQty = {
        cardsQty: playerDeck.cards.length,
        user_id: user.user_id,
        username: user.username,
      }
      socket.emit('playerCardsQty', playerCardsQty)
      checkIfPlayerHaveAPair()
      checkIfPlayerNoHaveCards()
    }
  }, [playerDeck])

  useEffect(() => {
    if (playerJoined) {
      setTimeout(() => {
        setPlayerJoined(false)
      }, 2000)
    }
  }, [playerJoined])

  useEffect(() => {
    if (!removePlayer) return
    console.log(removePlayer)
    const pys = players.filter((player) => player.user_id !== removePlayer)
    setPlayers([pys])
  }, [removePlayer])

  useEffect(() => {
    socket.on('player-joined', ({ username, image }) => {
      setPlayerJoined({ username, image })
    })

    socket.on('party', (party) => {
      setParty(party)
    })

    socket.on('deckGenerate', async (data) => {
      if (playerDeck || !user) {
        return
      }
      setStart(true)
      await drawCards(data.deck.deck_id, 3)
      const pos = data.pos + 1
      socket.emit('startGame', { deck: data.deck, pos })
    })

    socket.on('playerCardsQty', (data) => {
      setPlayerCardsQtyState(data)
    })

    socket.on('playerRandom', (playerRandom) => {
      setTimeout(async () => {
        await setPlayerInTurn(playerRandom)
        setAlertPlayerStart(true)
      }, 1000)

      setTimeout(() => {
        setAlertPlayerStart(false)
        setStopTimer(false)
      }, 3000)
    })

    socket.on('askPlayer', (data) => {
      setCardAskedFor({
        sender: data.sender,
        receiver: data.receiver,
        card: data.card,
      })
    })

    socket.on('playerAskingAPlayer', (data) => {
      setPlayerAskingAPlayer(data)
    })

    socket.on('playerAnswerAPlayer', (data) => {
      setPlayerAnswerAPlayer(data)
    })

    socket.on('doesPlayerHaveCard', (data) => {
      setPlayerResponseCard(data.card)
      setPlayerResponseMenu(true)
      setTimeout(() => {
        setPlayerResponseMenu(false)
        if (data.card) {
          setSnatchCard(data)
        } else {
          setDrawCardState(true)
          setPassTurnState(true)
        }
      }, 2000)
    })

    socket.on('snatchCard', (data) => {
      setCardSnatched(data)
    })

    socket.on('player-left', (user_id) => {
      setRemovePlayer(user_id)
    })

    socket.on('stopTimer', () => {
      setStopTimer(true)
    })

    socket.on('cardsRemaining', (cardsRemaining) => {
      setNumberOfCardsInDeck(cardsRemaining)
    })

    socket.on('nextPlayer', (nextPlayerSocketId) => {
      setNextPlayerState({ socketId: nextPlayerSocketId })
      setStopTimer(false)
    })

    socket.on('changeRole', () => {
      console.log('chengeRole')
      setChangeRole(true)
    })

    socket.on('endGame', (winner) => {
      console.log(`${winner.username} won the game`)
      setWinner(winner)
      if (winner.user_id === user.user_id) {
        setXpEarned(xpEarned + 100)
        setCoinsEarned(coinsEarned + 50)
      }
      setStart(false)
    })

    // socket.on('yourTurn', playerId => {

    // })

    socket.on('roomFull', (isFull) => {
      setRoomFull(isFull)
    })
  }, [socket])

  useEffect(() => {
    let count = 2
    let playersArr = []
    if (!Object.keys(party).length) {
      return
    }

    const playersInParty = party.players
    const players = playersInParty.filter(
      (player) => player.user_id !== user.user_id
    )
    if (players.length > 0) {
      players.forEach((p) => {
        playersArr.push({
          ...p,
          pos: `player${count}`,
        })
        count++
      })
      setPlayers(playersArr)
    }
  }, [party])

  return (
    <div className={styles.container}>
      <div className={styles.gameContainer}>
        <PlayerContainer pos='player2'>
          <Player
            playerData={players.find((p) => p.pos === 'player2')}
            drawACard={true}
            cardsQty={true}
            msg={true}
          />
        </PlayerContainer>
        <PlayerContainer pos='player3'>
          <Player
            playerData={players.find((p) => p.pos === 'player3')}
            drawACard={true}
            cardsQty={true}
            msg={true}
          />
        </PlayerContainer>
        <PlayerContainer pos='player4'>
          <Player
            playerData={players.find((p) => p.pos === 'player4')}
            drawACard={true}
            cardsQty={true}
            msg={true}
          />
        </PlayerContainer>
        <PlayerContainer pos='player5'>
          <Player
            playerData={players.find((p) => p.pos === 'player5')}
            drawACard={true}
            cardsQty={true}
            msg={true}
          />
        </PlayerContainer>
        <PlayerContainer pos='player6'>
          <Player
            playerData={players.find((p) => p.pos === 'player6')}
            drawACard={true}
            cardsQty={true}
            msg={true}
          />
        </PlayerContainer>
        <PlayerContainer pos='player1'>
          <Player playerData={user} drawACard={true} />
          {playerInTurn && playerInTurn.username === user.username && (
            <>
              {cardSelected ? (
                <AskButton text={'Preguntar'} onClick={askPlayers} />
              ) : null}
            </>
          )}
        </PlayerContainer>
        <section className={styles.center}>
          <Deck />
        </section>
        <Pairs />
        <PlayerCards deck={playerDeck} />
      </div>
      {user?.role === 'creator' && (
        <>
          {!start && (
            <Modal blur={false} paddingTop={'20rem'}>
              <AlertBox>
                <Button
                  text={'START'}
                  onClick={() => {
                    if (party.players.length === 1) {
                      setAlertMissPlayers(true)
                      setTimeout(() => {
                        setAlertMissPlayers(false)
                      }, 3000)
                      return
                    }
                    startGame()
                    initGame()
                    getRandomPlayerToOpenTheWater()
                  }}
                />
              </AlertBox>
            </Modal>
          )}
        </>
      )}
      {alertPlayerStart && (
        <Modal blur={false} paddingTop={'20rem'}>
          <AlertBox>
            {user?.username === playerInTurn?.username ? (
              <h1>Tu abres el agua</h1>
            ) : (
              <h1>{playerInTurn.username} abre el agua</h1>
            )}
          </AlertBox>
        </Modal>
      )}

      {alertMissPlayers && (
        <AlertNotify>
          <h3>No hay suficientes jugadores</h3>
        </AlertNotify>
      )}

      {playerJoined && (
        <PlayerNotify data={playerJoined} message='Se unio a la partida' />
      )}

      {askPlayerForCardMenu && (
        <Modal blur={false} paddingTop={'20rem'}>
          <AskPlayer
            players={party.players}
            closeAsk={toggleAskPlayerForCardMenu}
            askToPlayer={askToPlayer}
          />
        </Modal>
      )}

      {cardAskMenu && cardAskMenuValues && (
        <Modal paddingTop={'10rem'}>
          <AlertBox>
            <p>
              {cardAskMenuValues.sender} te pregunto por un{' '}
              {cardAskMenuValues.card}
            </p>
          </AlertBox>
        </Modal>
      )}

      {snatchCard && (
        <Modal blur={false} paddingTop={'20rem'}>
          <SnatchCard data={snatchCard} setSnatchCard={setSnatchCard} />
        </Modal>
      )}

      {hasCardMenu && (
        <Modal blur={false} paddingTop={'20rem'}>
          <AlertBox>
            <h2>¿Tienes la carta?</h2>
            {hasACard ? <h3>SI</h3> : <h3>NO</h3>}
            <Timer time={5} timerStyle='responseCardAlert' />
            <Button text='Responder' onClick={answerIfPlayerHasCard} />
          </AlertBox>
        </Modal>
      )}

      {playerResponseMenu && (
        <Modal blur={false} paddingTop={'15rem'}>
          <AlertBox>
            {playerResponseCard ? (
              <h2>Si tiene la carta</h2>
            ) : (
              <h2>No tiene la carta</h2>
            )}
          </AlertBox>
        </Modal>
      )}
      {cardSnatchedMenu && (
        <Modal blur={false} paddingTop={'15rem'}>
          <AlertBox>
            <p>
              {cardSnatched.sender.username} te arrebato un{' '}
              {cardSnatched.cardValue.value}
            </p>
          </AlertBox>
        </Modal>
      )}

      {roomFull && (
        <Modal>
          <div className={styles.roomFullContainer}>
            <h1>Room is full</h1>
          </div>
        </Modal>
      )}

      {!start && winner && (
        <Modal>
          <EndGameScreen
            winnerName={winner.username}
            winnerId={winner.user_id}
          />
        </Modal>
      )}
    </div>
  )
}
