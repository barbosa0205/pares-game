import React from 'react'
import { Layout } from './components/Layout'
import { GameProvider } from './contexts/game/GameProvider'
import { UserProvider } from './contexts/user/UserProvider'
import { AppRouter } from './routers/AppRouter'

export const App = () => {
    return (
        <UserProvider>
            <GameProvider>
                <Layout>
                    <AppRouter />
                </Layout>
            </GameProvider>
        </UserProvider>
    )
}
