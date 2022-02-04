import React, { useState } from 'react'
import { Coins } from '../Coins'
import styles from './styles/menubar.module.scss'
import xpIcon from '../../assets/xp.png'
import coinIcon from '../../assets/coin.png'
import { useUser } from '../../contexts/user/useUser'
import { ProgressBar } from '../ProgressBar'
import { Modal } from '../Modal'
import { UserSettings } from '../UserSettings'
import { useNavigate } from 'react-router-dom'
export const Menubar = () => {
    const navigate = useNavigate()
    const { user, logout } = useUser()
    const { username, clan, level, xp, xp_needed, coins, gems, img } = user
    const [settingsModal, setSettingsModal] = useState(false)
    return (
        <>
            <nav className={styles.menuContainer}>
                <section className={styles.coinsSection}>
                    <Coins
                        name={'xp'}
                        mount={`${xp}/${xp_needed}`}
                        coinIcon={xpIcon}
                    />
                    <Coins name={'coin'} mount={coins} coinIcon={coinIcon} />
                    <Coins
                        name={'gold'}
                        mount={gems}
                        coinIcon={'https://i.imgur.com/lucd0Zm.png'}
                    />
                </section>
                <section className={styles.userSection}>
                    <div className={styles.userContainer}>
                        <div className={styles.userImgContainer}>
                            <div className={styles.userImg}>
                                <img src={img} alt={username} />
                            </div>
                            <div className={styles.iconsContainer}>
                                <i
                                    className="ri-logout-box-line"
                                    onClick={logout}
                                ></i>
                                <i
                                    className="ri-settings-5-line"
                                    onClick={() => {
                                        navigate('/settings')
                                    }}
                                ></i>
                            </div>
                        </div>
                        <p className={styles.userName}>{username}</p>
                        <p className={styles.label}>
                            CLAN: [<span> {clan} </span>]
                        </p>
                        <div className={styles.levelContainer}>
                            <span>
                                lvl: <p>{level}</p>
                            </span>
                            <ProgressBar />
                        </div>
                    </div>
                </section>
            </nav>
            {settingsModal && (
                <Modal>
                    <UserSettings />
                </Modal>
            )}
        </>
    )
}
