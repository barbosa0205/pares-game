import React, { useState, useEffect } from 'react'
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
import { Layout } from '../../components/Layout'

export const GamePage = () => {
    const navigate = useNavigate()
    const { socket } = useSocket()
    const params = useParams()
    const { user, setUser } = useUser()

    const {
        start,
        startGame,
        generateDeckOfCards,
        drawCards,
        drawACard,
        checkIfPlayerHaveAPair,
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
        askCardAlert,
        cardAskedFor,
        setCardAskedFor,
        answerIfPlayerHasCard,
        hasACard,
        setHasACard,
        passTurnState,
        setPassTurnState,
        drawCardForTimerState,
        setDrawCardForTimerState,
    } = useGame()

    const room = params.gameId
    const [party, setParty] = useState({})
    const [alertPlayerStart, setAlertPlayerStart] = useState(false)

    const [askPlayerForCardMenu, toggleAskPlayerForCardMenu] = useMenu(false)

    const [players, setPlayers] = useState([])

    const [cardAskMenu, setCardAskMenu] = useState(false)
    const [cardAskMenuValues, setCardAskMenuValues] = useState(null)
    const [roomFull, setRoomFull] = useState(false)
    const [snatchCard, setSnatchCard] = useState(null)

    const [playerResponseCard, setPlayerResponseCard] = useState(null)
    const [playerResponseMenu, setPlayerResponseMenu] = useState(false)

    const [nextPlayerState, setNextPlayerState] = useState(null)

    const [drawCardState, setDrawCardState] = useState(false)

    const initGame = async () => {
        if (!user || playerDeck) {
            return
        }
        const deck = await generateDeckOfCards()
        socket.emit('startGame', deck)
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
            setStopTimer(true)
            socket.emit('stopTimer')
            const mainuser = party.players.find(p => p.user_id === user.user_id)

            socket.emit('askPlayer', {
                sender: mainuser,
                receiver: players[0],
                card: cardSelected.value,
            })
        } else {
            toggleAskPlayerForCardMenu()
        }
    }

    const askToPlayer = playerId => {
        console.log(playerId)
        setCardSelected(null)
        setStopTimer(true)
        socket.emit('stopTimer')
        const mainuser = party.players.find(p => p.user_id === user.user_id)
        const receiver = party.players.find(p => p.user_id === playerId)
        socket.emit('askPlayer', {
            sender: mainuser,
            receiver,
            card: cardSelected.value,
        })
    }

    const askForCard = () => {
        const hasTheCard = playerDeck.cards.find(
            pcard => pcard.value === cardAskedFor.card
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

    const addCardInDeck = async deck_id => {
        const newCard = await drawACard(deck_id)

        setPlayerDeck({
            ...playerDeck,
            cards: [...playerDeck.cards, newCard.cards[0]],
        })
    }

    const passTurn = () => {
        const socketOfPlayerInTurn = playerInTurn.socketId
        socket.emit('passTurn', socketOfPlayerInTurn)
    }

    const drawingACard = async () => {
        const playerInTurnUsername = playerInTurn.username
        const userUsername = user.username
        console.log()
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
            console.log('SI ESTA JALANDO')
            const next = party.players.find(
                player => player.socketId === nextPlayerState.socketId
            )
            console.log(next)
            setPlayerInTurn(next)
            setNextPlayerState(null)
        }
    }, [nextPlayerState])

    useEffect(() => {
        if (passTurnState) {
            passTurn()
            setPassTurnState(false)
        }
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
        answerIfPlayerHasCard()
    }, [askCardAlert])

    useEffect(() => {
        if (Object.keys(cardAskedFor).length > 0) {
            askForCard()
        }
    }, [cardAskedFor])

    useEffect(() => {
        playerDeck && checkIfPlayerHaveAPair()
    }, [playerDeck])

    useEffect(() => {
        socket.on('player-joined', username => {
            console.log(`${username} connected to the room`)
        })

        socket.on('party', party => {
            setParty(party)
        })

        socket.on('deckGenerate', async deck => {
            if (playerDeck || !user) {
                return
            }
            setStart(true)
            await drawCards(deck.deck_id, 3)
        })

        socket.on('playerRandom', playerRandom => {
            setTimeout(async () => {
                await setPlayerInTurn(playerRandom)
                setAlertPlayerStart(true)
            }, 1000)

            setTimeout(() => {
                setAlertPlayerStart(false)
                setStopTimer(false)
            }, 3000)
        })

        socket.on('askPlayer', data => {
            setCardAskedFor({
                sender: data.sender,
                receiver: data.receiver,
                card: data.card,
            })
        })

        socket.on('doesPlayerHaveCard', data => {
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

        socket.on('player-left', username => {
            console.log(`${username} left the room`)
        })

        socket.on('stopTimer', () => {
            setStopTimer(true)
        })

        socket.on('nextPlayer', nextPlayerSocketId => {
            setNextPlayerState({ socketId: nextPlayerSocketId })
            setStopTimer(false)
        })

        // socket.on('yourTurn', playerId => {

        // })

        socket.on('roomFull', isFull => {
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
            player => player.user_id !== user.user_id
        )
        if (players.length > 0) {
            players.forEach(p => {
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
        <Layout>
            <div className={styles.gameContainer}>
                <PlayerContainer pos="player2">
                    <Player
                        playerData={players.find(p => p.pos === 'player2')}
                        drawACard={true}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player3">
                    <Player
                        playerData={players.find(p => p.pos === 'player3')}
                        drawACard={true}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player4">
                    <Player
                        playerData={players.find(p => p.pos === 'player4')}
                        drawACard={true}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player5">
                    <Player
                        playerData={players.find(p => p.pos === 'player5')}
                        drawACard={true}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player6">
                    <Player
                        playerData={players.find(p => p.pos === 'player6')}
                        drawACard={true}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player1">
                    <Player playerData={user} drawACard={true} />
                    {playerInTurn &&
                        playerInTurn.username === user.username && (
                            <>
                                {cardSelected ? (
                                    <AskButton
                                        text={'Preguntar'}
                                        onClick={askPlayers}
                                    />
                                ) : null}
                            </>
                        )}
                </PlayerContainer>
                <section className={styles.center}>
                    <Deck />
                </section>
                <Pairs />
                <PlayerCards
                    deck={playerDeck}
                    setCardSelected={setCardSelected}
                    cardSelected={cardSelected}
                />

                {user?.role === 'creator' && (
                    <>
                        {!start && (
                            <Modal blur={false} paddingTop={'20rem'}>
                                <AlertBox>
                                    <Button
                                        text={'START'}
                                        onClick={() => {
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
                        <SnatchCard data={snatchCard} />
                    </Modal>
                )}

                {hasCardMenu && (
                    <Modal blur={false} paddingTop={'20rem'}>
                        <AlertBox>
                            <h2>¿Tienes la carta?</h2>
                            {hasACard ? <h3>SI</h3> : <h3>NO</h3>}
                            <Timer time={5} timerStyle="responseCardAlert" />
                            <Button
                                text="Responder"
                                onClick={answerIfPlayerHasCard}
                            />
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

                {roomFull && (
                    <Modal>
                        <div className={styles.roomFullContainer}>
                            <h1>Room is full</h1>
                        </div>
                    </Modal>
                )}
            </div>
        </Layout>
    )
}
