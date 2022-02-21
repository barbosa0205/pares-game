import io from 'socket.io-client'

export const socket = io('ws://localhost:3001')
export const game = io('ws://localhost:3001/game')
