import { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [start, setStart] = useState(false)

    const contextValue = {}
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}
