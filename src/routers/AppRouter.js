import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GamePage } from '../pages/Game'
import { LoginPage } from '../pages/Login'
import { MainRoutes } from './MainRoutes'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="/*" element={<MainRoutes />} />
                <Route path="game/:gameId" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    )
}
