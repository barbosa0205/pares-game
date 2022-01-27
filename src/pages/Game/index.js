import React, { useState, useEffect } from 'react'
import { Deck } from '../../components/Deck'
import { Pairs } from '../../components/Pairs'
import { PlayerCards } from '../../components/PlayerCards'
import { PlayerMenu } from '../../components/PlayerMenu'
import { PlayersContainer } from '../../components/PlayersContainer'
import { generateDeackOfCards } from '../../gameConfig/cards'

import styles from './styles/game.module.scss'
export const GamePage = () => {
    const [deck, setDeck] = useState([])
    useEffect(() => {
        setDeck(generateDeackOfCards())
    }, [])
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
