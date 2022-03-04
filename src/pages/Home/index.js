import React, { useState } from 'react'
import { Carrousel } from '../../components/Carrousel'
import { GameCard } from '../../components/GameCard'
import { Menubar } from '../../components/Menubar'
import styles from './styles/home.module.scss'
import goldCards from '../../assets/gold-cards.png'
import { nanoid } from 'nanoid'
import { Modal } from '../../components/Modal'
import { PlayOptions } from '../../components/PlayOptions'
import { useUser } from '../../contexts/user/useUser'
import { CreateAPassword } from '../../components/CreateAPassword'
import { useMenu } from '../../hooks/useMenu'
export const HomePage = () => {
    const [menu, toggleMenu] = useMenu(true)
    const { isLoggedInWithGoogle } = useUser()
    const [playModal, setPlayModal] = useState(false)

    return (
        <>
            <div className={styles.mainContainer}>
                <Menubar />
                <h1>PARES GAME</h1>
                <Carrousel>
                    <GameCard
                        img={goldCards}
                        url={`/game/${nanoid()}`}
                        setPlayModal={setPlayModal}
                    />
                </Carrousel>
                {playModal && (
                    <Modal paddingTop={'15rem'}>
                        <PlayOptions setPlayModal={setPlayModal} />
                    </Modal>
                )}
                {isLoggedInWithGoogle && (
                    <>
                        {menu && (
                            <Modal>
                                <CreateAPassword toggleMenu={toggleMenu} />
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
