import React, { useState, useEffect } from 'react'
import { Deck } from '../../components/Deck'
import { Pairs } from '../../components/Pairs'
import { PlayerCards } from '../../components/PlayerCards'
import { PlayerMenu } from '../../components/PlayerMenu'
import { PlayersContainer } from '../../components/PlayersContainer'
import { generateDeckOfCards } from '../../gameConfig/cards'
import { socket } from '../../components/Socket'

import styles from './styles/game.module.scss'
import { useUser } from '../../contexts/user/useUser'
import { useGame } from '../../contexts/game/useGame'
import { useParams } from 'react-router-dom'
export const GamePage = () => {
    const params = useParams()
    const { user } = useUser()
    const room = params.gameId
    const [deck, setDeck] = useState([])
    const [party, setParty] = useState([])

    return (
        <div className={styles.gameContainer}>
            <PlayersContainer></PlayersContainer>

            <section className={styles.playerContainer}>
                <Deck deck={deck} setDeck={setDeck} />
                <Pairs />
                <PlayerMenu />
            </section>
            <PlayerCards />
        </div>
    )
}
