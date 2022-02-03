import React, { useState } from 'react'
import { useUser } from '../../contexts/user/useUser'
import { getIdByUserID, userAlreadyExists } from '../../helpers/get'
import { updateUserById } from '../../helpers/update'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'

import styles from './styles/profileSettings.module.scss'

export const ProfileSettings = () => {
    const { user, setUser } = useUser()
    const [profileValues, handleProfileChange] = useForm({
        username: user.username,
        clan: user.clan,
        img: user.img,
    })

    const [profileError, setProfileError] = useState(null)

    const saveChanges = async () => {
        setProfileError(null)
        if (profileValues.username !== user.username) {
            if (!profileValues.username) {
                setProfileError('El nombre de usuario es requerido')
                return
            }
            if (profileValues.username.length < 4) {
                setProfileError({
                    error: 'El nombre de usuario debe tener al menos 4 caracteres',
                })
                return
            }
            if (profileValues.username.length > 20) {
                setProfileError({
                    error: 'El nombre de usuario debe tener maximo 20 caracteres',
                })
                return
            }
        }
        if (profileValues.clan !== user.clan) {
            if (profileValues.clan.length > 4) {
                setProfileError({
                    error: 'El nombre del clan debe tener como maximo 4 caracteres',
                })
                return
            }
        }

        if (userAlreadyExists(profileValues.username)) {
            setProfileError('El nombre de usuario ya existe')
            return
        }

        const id = await getIdByUserID(user.user_id)
        updateUserById(id, profileValues)
        setUser({ ...user, ...profileValues })
        localStorage.setItem('user', JSON.stringify(user))
    }
    return (
        <div className={styles.profileSettingsContainer}>
            <h2 className={styles.subtitle}>Perfil</h2>
            <div className={styles.settingImgContainer}>
                <div className={styles.imgContainer}>
                    <img src={user.img} alt={'user profile'} />
                </div>
                <i className="ri-pencil-line"></i>
            </div>
            <div className={styles.nameClanContainer}>
                <input
                    className={styles.usernameInput}
                    type="text"
                    name="username"
                    onChange={handleProfileChange}
                    value={profileValues.username}
                />
                <p className={styles.corchete}>{'['}</p>
                <input
                    className={styles.clanInput}
                    type="text"
                    name="clan"
                    onChange={handleProfileChange}
                    value={profileValues.clan}
                />
                <p className={styles.corchete}>{']'}</p>
            </div>
            <Button text={'GUARDAR CAMBIOS'} onClick={saveChanges} />
        </div>
    )
}
