import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { FriendsPage } from '../pages/Friends'
import { HomePage } from '../pages/Home'
import { LockerPage } from '../pages/Locker'
import { SettingsPage } from '../pages/Settings'
import { StorePage } from '../pages/Store'

export const MainRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="store" element={<StorePage />} />
                <Route path="friends" element={<FriendsPage />} />
                <Route path="locker" element={<LockerPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Routes>
        </>
    )
}
