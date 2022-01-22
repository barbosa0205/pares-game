import React from 'react'
import { Button } from '../Button'

import styles from './styles/gameCard.module.scss'
export const GameCard = () => {
    return (
        <article className={styles.cardContainer}>
            <Button text={'Play'} />
        </article>
    )
}
