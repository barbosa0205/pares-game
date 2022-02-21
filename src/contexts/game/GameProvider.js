import { createContext, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
export const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [start, setStart] = useState(false)
    const [deck, setDeck] = useState(null)
    const [playerDeck, setPlayerDeck] = useState(null)

    const startGame = () => {
        setStart(true)
    }

    const generateDeckOfCards = async () => {
        try {
            const resp = await fetch(
                'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
            )
            const data = await resp.json()
            console.log(data)
            return data
        } catch (error) {
            console.error(`Error generating deck of cards: ${error}`)
        }
    }

    const drawCards = async (deck_id, count) => {
        try {
            const resp = await fetch(
                `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`
            )
            const data = await resp.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const contextValue = {
        start,
        startGame,
        generateDeckOfCards,
        deck,
        drawCards,
        playerDeck,
        setPlayerDeck,
    }
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}
