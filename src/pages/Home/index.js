import React from 'react'
import { Carrousel } from '../../components/Carrousel'
import { GameCard } from '../../components/GameCard'
import { Menubar } from '../../components/Menubar'
import styles from './styles/home.module.scss'
import goldCards from '../../assets/gold-cards.png'
import { nanoid } from 'nanoid'
export const HomePage = () => {
    return (
        <div className={styles.mainContainer}>
            <Menubar />
            <h1>PARES GAME</h1>
            <Carrousel>
                <GameCard img={goldCards} url={`/game/${nanoid()}`} />
            </Carrousel>
        </div>
    )
}
