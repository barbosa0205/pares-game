import React, { useState } from 'react'
import { useUser } from '../../contexts/user/useUser'
import { getIdByUserID, userAlreadyExists } from '../../helpers/get'
import { usernameAndClanErrorsValidation } from '../../helpers/settingsErrValidate'
import { updateUserById } from '../../helpers/update'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { ChangeProfileImage } from '../ChangeProfileImage'
import { Modal } from '../Modal'

import styles from './styles/profileSettings.module.scss'

export const ProfileSettings = () => {
    const { user, setUser } = useUser()
    const [profileValues, handleProfileChange, handleBlur] = useForm(
        {
            username: user.username,
            clan: user.clan,
            img: user.img,
        },
        usernameAndClanErrorsValidation
    )

    const [profileError, setProfileError] = useState(null)

    const [changesSaved, setChangesSaved] = useState(false)
    const [changeImage, setChangeImage] = useState(false)

    const saveChanges = async () => {
        //TODO: FIX THIS
        setProfileError({ error: '' })

        if (
            profileValues.username.trim() === user.username &&
            profileValues.clan.trim() === user.clan
        ) {
            return
        }

        if (
            profileValues.username.trim() === user.username &&
            profileValues.clan.trim() !== user.clan
        ) {
            if (profileValues.clan.trim().length > 4) {
                setProfileError({
                    error: 'el clan debe tener maximo 4 caracteres',
                })
                return
            }
            const id = await getIdByUserID(user.user_id)
            updateUserById(id, { clan: profileValues.clan })
            setUser({ ...user, clan: profileValues.clan })
            localStorage.setItem(
                'user',
                JSON.stringify({ ...user, clan: profileValues.clan })
            )
            setChangesSaved(true)
        } else {
            const userExist = await userAlreadyExists(
                profileValues.username.trim()
            )
            if (userExist) {
                setProfileError({
                    error: 'el usuario ya existe',
                })
                return
            }
            if (profileValues.username.trim().length > 20) {
                setProfileError({
                    error: 'el nombre de usuario debe tener maximo 20 caracteres',
                })
                return
            }
            const id = await getIdByUserID(user.user_id)
            updateUserById(id, profileValues)
            setUser({ ...user, ...profileValues })
            localStorage.setItem(
                'user',
                JSON.stringify({ ...user, ...profileValues })
            )
            setChangesSaved(true)
        }
    }

    return (
        <>
            <div className={styles.profileSettingsContainer}>
                {!changeImage ? (
                    <>
                        <div className={styles.settingImgContainer}>
                            <div className={styles.imgContainer}>
                                <img src={user.img} alt={'user profile'} />
                            </div>
                            <i
                                className="ri-pencil-line"
                                onClick={() => setChangeImage(!changeImage)}
                            ></i>
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
                        {profileError && (
                            <p className={styles.errors}>
                                {profileError.error}
                            </p>
                        )}
                        <Button
                            text={'GUARDAR CAMBIOS'}
                            onClick={saveChanges}
                        />
                        {changesSaved && (
                            <p className={styles.success}>
                                Cambios guardados con exito
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <div className={styles.settingImgContainer}>
                            <ChangeProfileImage close={setChangeImage} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
