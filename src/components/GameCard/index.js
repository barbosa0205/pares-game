import React from 'react'
import { Button } from '../Button'
import styles from './styles/gameCard.module.scss'
export const GameCard = ({ img, url, setPlayModal }) => {
    return (
        <article className={styles.cardContainer}>
            <img src={img} alt="cards" />
            <h2>1 vs 1</h2>
            <Button
                text={'Play'}
                onClick={() => {
                    setPlayModal(m => !m)
                }}
            />
        </article>
    )
}
