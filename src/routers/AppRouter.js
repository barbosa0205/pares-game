import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { GamePage } from '../pages/Game'
import { LoginPage } from '../pages/Login'
import { MainRoutes } from './MainRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <MainRoutes />
                        </PrivateRoute>
                    }
                />
                <Route path="game/:gameId" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    )
}
