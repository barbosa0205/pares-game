import { createContext, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
export const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [start, setStart] = useState(false)

    const contextValue = {
        start,
    }
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}
