import React, { useState } from 'react'
import { useGame } from '../../contexts/game/useGame'
import { Button } from '../Button'
import styles from './styles/pairs.module.scss'
export const Pairs = () => {
    const { pairs } = useGame()
    const [openPairs, setOpenPairs] = useState(false)
    return (
        <>
            <button
                className={styles.btnPairs}
                type="button"
                onClick={() => setOpenPairs(!openPairs)}
            >
                PARES
            </button>
            {openPairs && (
                <div className={styles.pairsContainer}>
                    <div className={styles.closeContainer}>
                        <i
                            className="ri-close-circle-line"
                            onClick={() => setOpenPairs(false)}
                        ></i>
                    </div>
                    <div className={styles.pairs}>
                        {pairs.map((pair, index) => {
                            return (
                                <div
                                    className={styles.pairContainer}
                                    key={index}
                                >
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
                </div>
            )}
        </>
    )
}
