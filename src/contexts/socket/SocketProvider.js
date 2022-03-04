import { createContext } from 'react'
import { io } from 'socket.io-client'
export const SocketContext = createContext()
const ENDPOINT = `localhost:3004`
const socket = io(ENDPOINT)
export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
}
const contextValue = {
    socket,
    io,
}
