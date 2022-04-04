import { createContext, useState } from 'react'
import { io } from 'socket.io-client'
export const SocketContext = createContext()

const ENDPOINT = `pares-game.herokuapp.com/`

const socket = io(ENDPOINT, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: true,
})
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
