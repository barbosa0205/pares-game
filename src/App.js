import React from 'react'
import { Layout } from './components/Layout'
import { GameProvider } from './contexts/game/GameProvider'
import { SocketProvider } from './contexts/socket/SocketProvider'
import { UserProvider } from './contexts/user/UserProvider'
import { AppRouter } from './routers/AppRouter'

export const App = () => {
  return (
    <UserProvider>
      <SocketProvider>
        <GameProvider>
          <AppRouter />
        </GameProvider>
      </SocketProvider>
    </UserProvider>
  )
}
