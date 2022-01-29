import { useContext } from 'react'
import { GameContext } from './GameProvider'

export const useGame = () => {
    const contextValue = useContext(GameContext)
    return contextValue
}
