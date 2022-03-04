import { useContext } from 'react'
import { SocketContext } from './SocketProvider'

export const useSocket = () => {
    const contextValue = useContext(SocketContext)
    return contextValue
}
