import { createContext, useEffect, useState } from 'react'
import { useSocket } from '../socket/useSocket'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const { socket } = useSocket()
    const [start, setStart] = useState(false)
    const [playerDeck, setPlayerDeck] = useState(null)
    const [pairs, setPairs] = useState([])
    const [playerInTurn, setPlayerInTurn] = useState(null)
    const [cardSelected, setCardSelected] = useState(null)
    const [askedCardValue, setAskedCardValue] = useState(null)
    const [hasACard, setHasACard] = useState(null)
    const [hasCardMenu, setHasCardMenu] = useState(false)
    const [stopTimer, setStopTimer] = useState(true)
    const [askCardAlert, setAskCardAlert] = useState(false)
    const [cardAskedFor, setCardAskedFor] = useState({})
    const [hasAPair, setHasAPair] = useState([])
    const [playerCardsPos, setPlayerCardsPos] = useState(0)
    const [passTurnState, setPassTurnState] = useState(false)
    const [drawCardForTimerState, setDrawCardForTimerState] = useState(false)
    const startGame = () => {
        setStart(true)
    }

    const generateDeckOfCards = async () => {
        try {
            const resp = await fetch(
                'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&lang=es'
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
            setPlayerDeck(data)
        } catch (error) {
            console.error(error)
        }
    }
    const drawACard = async deck_id => {
        try {
            const resp = await fetch(
                `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
            )
            const data = await resp.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const checkIfPlayerHaveAPair = () => {
        playerDeck.cards.forEach(card => {
            const cards = playerDeck.cards.filter(c => c.code !== card.code)
            cards.forEach(c => {
                if (c.value === card.value) {
                    setHasAPair([...hasAPair, c, card])
                }
            })
        })
    }

    const answerIfPlayerHasCard = () => {
        setHasCardMenu(false)
        if (Object.keys(cardAskedFor).length) {
            socket.emit('doesPlayerHaveCard', {
                card: hasACard,
                sender: cardAskedFor.receiver,
                receiver: cardAskedFor.sender,
                contrincantDeck: playerDeck,
            })
            setCardAskedFor({})
            setAskedCardValue(null)
        }
    }

    useEffect(() => {
        if (hasAPair.length) {
            const pair = hasAPair.map(c => {
                return {
                    code: c.code,
                    image: c.image,
                    value: c.value,
                    pos: 1 + hasAPair.indexOf(c),
                }
            })
            setPairs([...pairs, [...pair]])
            const newDeck = playerDeck.cards.filter(c => {
                return !hasAPair.includes(c)
            })
            setPlayerDeck({ ...playerDeck, cards: newDeck })
            setHasAPair([])
        }
    }, [hasAPair])

    //TODO: COLOCARLE POSICION A LAS CARTAS DEL JUGADOR

    const contextValue = {
        start,
        setStart,
        startGame,
        generateDeckOfCards,
        drawCards,
        drawACard,
        checkIfPlayerHaveAPair,
        playerInTurn,
        setPlayerInTurn,
        cardSelected,
        setCardSelected,
        playerDeck,
        setPlayerDeck,
        hasCardMenu,
        setHasCardMenu,
        askedCardValue,
        setAskedCardValue,
        stopTimer,
        setStopTimer,
        askCardAlert,
        setAskCardAlert,
        answerIfPlayerHasCard,
        cardAskedFor,
        setCardAskedFor,
        hasACard,
        setHasACard,
        hasAPair,
        setHasAPair,
        pairs,
        setPairs,
        playerCardsPos,
        setPlayerCardsPos,
        passTurnState,
        setPassTurnState,
        drawCardForTimerState,
        setDrawCardForTimerState,
    }
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}
