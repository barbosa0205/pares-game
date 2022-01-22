import React from 'react'
import { Carrousel } from '../../components/Carrousel'
import { GameCard } from '../../components/GameCard'
import { Menubar } from '../../components/Menubar'
import styles from './styles/home.module.scss'
export const HomePage = () => {
    return (
        <div className={styles.mainContainer}>
            <Menubar />
            <Carrousel>
                <GameCard />
            </Carrousel>
        </div>
    )
}
