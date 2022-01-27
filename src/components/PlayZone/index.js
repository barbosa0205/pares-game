import React from 'react'

import styles from './styles/playzone.module.scss'

export const PlayZone = ({ children }) => {
    return <section className={styles.playZone}>{children}</section>
}
