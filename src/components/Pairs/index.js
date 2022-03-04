import React from 'react'
import { useGame } from '../../contexts/game/useGame'
import styles from './styles/pairs.module.scss'
export const Pairs = () => {
    const { pairs } = useGame()
    return (
        <div className={styles.pairsContainer}>
            <h3>PARES</h3>
            {pairs.map((pair, index) => {
                return (
                    <div className={styles.pairContainer} key={index}>
                        {pair.map(card => {
                            return (
                                <img
                                    className={
                                        card.pos === 1
                                            ? styles.card1
                                            : styles.card2
                                    }
                                    key={card.code}
                                    src={card.image}
                                    alt={`card ${card.code}`}
                                ></img>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
