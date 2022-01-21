import React from 'react'
import styles from './styles/coins.module.scss'
export const Coins = ({ mount, coinIcon, name }) => {
    return (
        <div className={styles.mainContainer}>
            <img
                className={styles.coinImg}
                src={coinIcon}
                alt={name}
                title={name}
            />
            <span className={styles.coinContainer}>{mount}</span>
        </div>
    )
}
