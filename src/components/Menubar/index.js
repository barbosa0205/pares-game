import React from 'react'
import { Coins } from '../Coins'
import styles from './styles/menubar.module.scss'
import xpIcon from '../../assets/xp.png'
import coinIcon from '../../assets/coin.png'
import { useUser } from '../../contexts/user/useUser'
export const Menubar = () => {
    const { user, logout } = useUser()
    const { username, clan, level, xp, xp_needed, coins, gems, img } = user
    return (
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
                        <i className="ri-logout-box-line" onClick={logout}></i>
                    </div>
                    <p className={styles.userName}>{username}</p>
                    <p className={styles.label}>
                        CLAN: [<span> {clan} </span>]
                    </p>
                    <div className={styles.levelContainer}>
                        <span>
                            lvl: <p>{level}</p>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={xp_needed}
                            value={xp}
                            readOnly
                        />
                    </div>
                </div>
            </section>
        </nav>
    )
}
