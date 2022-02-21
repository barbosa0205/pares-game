import React, { useState, useEffect } from 'react'
import { Deck } from '../../components/Deck'
import { Pairs } from '../../components/Pairs'
import { PlayerCards } from '../../components/PlayerCards'
import { PlayerMenu } from '../../components/PlayerMenu'
import { PlayersContainer } from '../../components/PlayersContainer'
import { io } from 'socket.io-client'
import styles from './styles/game.module.scss'
import { useUser } from '../../contexts/user/useUser'
import { useGame } from '../../contexts/game/useGame'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from '../../components/Modal'
import { PlayerContainer } from '../../components/PlayerContainer'
import { Player } from '../../components/Player'
import { Button } from '../../components/Button'
import { AlertBox } from '../../components/AlertBox'
const ENDPOINT = `localhost:3004`
const socket = io(ENDPOINT)
export const GamePage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { user } = useUser()
    const {
        start,
        startGame,
        generateDeckOfCards,
        drawCards,
        playerDeck,
        setPlayerDeck,
    } = useGame()
    const room = params.gameId
    const [party, setParty] = useState(null)
    const [players, setPlayers] = useState([])

    const [roomFull, setRoomFull] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/')
        } else {
            if (user.role) {
                socket.emit('join', {
                    room: room,
                    user_id: user.user_id,
                    username: user.username,
                    img: user.img,
                    role: user.role,
                })
                socket.emit('playerAlrightJoin', room)
            } else {
                navigate('/')
            }
        }

        return () => {
            setParty(null)
            setPlayers([])
            socket.emit('leaveRoom', {
                user_id: user?.user_id,
                room: room,
                username: user?.username,
            })
        }
    }, [])

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

            const cardsDraw = await drawCards(deck.deck_id, 3)

            setPlayerDeck(cardsDraw)
            console.log(`Se repartieron 3 cartas a ${user?.username}`)
        })

        socket.on('player-left', username => {
            console.log(`${username} left the room`)
        })

        socket.on('roomFull', isFull => {
            setRoomFull(isFull)
        })
    }, [])

    useEffect(() => {
        let count = 2
        let playersArr = []
        if (!party) {
            return
        }

        const playersInParty = party.players
        const players = playersInParty?.filter(
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
        }

        setPlayers(playersArr)
    }, [party])

    return (
        <>
            <div className={styles.gameContainer}>
                <PlayerContainer pos="player2">
                    <Player
                        playerData={players.find(p => p.pos === 'player2')}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player3">
                    <Player
                        playerData={players.find(p => p.pos === 'player3')}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player4">
                    <Player
                        playerData={players.find(p => p.pos === 'player4')}
                    />
                </PlayerContainer>
                <PlayerContainer pos="player5">
                    <Player playerData={''} />
                </PlayerContainer>
                <PlayerContainer pos="player6">
                    <Player playerData={''} />
                </PlayerContainer>
                <PlayerContainer pos="player1">
                    <Player playerData={user} />
                </PlayerContainer>
                <section className={styles.center}>
                    <Deck />
                </section>
                <Pairs />
                <PlayerCards deck={playerDeck} />
                {user?.role === 'creator' && (
                    <Modal blur={false}>
                        {!start && (
                            <AlertBox>
                                <Button
                                    text={'START'}
                                    onClick={async () => {
                                        startGame()
                                        const deck = await generateDeckOfCards()
                                        socket.emit('startGame', deck)
                                    }}
                                />
                            </AlertBox>
                        )}
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
        </>
    )
}
