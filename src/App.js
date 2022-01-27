import React from 'react'
import { Layout } from './components/Layout'
import { GameProvider } from './contexts/game/GameProvider'
import { AppRouter } from './routers/AppRouter'

export const App = () => {
    return (
        <GameProvider>
            <Layout>
                <AppRouter />
            </Layout>
        </GameProvider>
    )
}
