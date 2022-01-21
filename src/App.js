import React from 'react'
import { Layout } from './components/Layout'
import { AppRouter } from './routers/AppRouter'

export const App = () => {
    return (
        <Layout>
            <AppRouter />
        </Layout>
    )
}
