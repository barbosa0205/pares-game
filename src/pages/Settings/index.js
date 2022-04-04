import React from 'react'
import { DropDownContainer } from '../../components/DropDownContainer'
import { ProfileSettings } from '../../components/ProfileSettings'

import styles from './styles/settings.module.scss'

export const SettingsPage = () => {
  return (
    <div className={`${styles.settingsContainer}`}>
      <h1>CONFIGURACIÓN</h1>
      <DropDownContainer text={'PERFIL'}>
        <ProfileSettings />
      </DropDownContainer>
    </div>
  )
}
