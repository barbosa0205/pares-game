import React from 'react'
import { ProfileSettings } from '../../components/ProfileSettings'

import styles from './styles/settings.module.scss'

export const SettingsPage = () => {
    return (
        <div className={`${styles.settingsContainer}`}>
            <h1>Configuración</h1>
            <ProfileSettings />
        </div>
    )
}
