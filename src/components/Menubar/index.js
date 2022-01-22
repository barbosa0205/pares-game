import React from 'react'
import { Coins } from '../Coins'
import styles from './styles/menubar.module.scss'
import xpIcon from '../../assets/xp.png'
import coinIcon from '../../assets/coin.png'
export const Menubar = () => {
    return (
        <nav className={styles.menuContainer}>
            <section className={styles.coinsSection}>
                <Coins name={'xp'} mount={'300/1000'} coinIcon={xpIcon} />
                <Coins name={'coin'} mount={2342} coinIcon={coinIcon} />
                <Coins
                    name={'gold'}
                    mount={145}
                    coinIcon={'https://i.imgur.com/lucd0Zm.png'}
                />
            </section>
            <section className={styles.userSection}>
                <div className={styles.userContainer}>
                    <div className={styles.userImg}></div>
                    <p className={styles.userName}>Wicho</p>
                    <p className={styles.label}>
                        CLAN: [<span>MX</span>]
                    </p>
                    <div className={styles.levelContainer}>
                        <span>
                            lvl: <p>10</p>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={300}
                            readOnly
                        />
                    </div>
                </div>
            </section>
        </nav>
    )
}
