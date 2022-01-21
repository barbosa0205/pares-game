import React from 'react'

import styles from './styles/carrousel.module.scss'

export const Carrousel = ({ children }) => {
    return <section className={styles.carrouselContainer}>{children}</section>
}
