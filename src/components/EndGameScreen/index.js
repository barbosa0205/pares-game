import React, { useEffect } from 'react'
import { useGame } from '../../contexts/game/useGame'
import { useUser } from '../../contexts/user/useUser'
import { LevelUp } from '../LevelUp'
import styles from './styles/endGameScreen.module.scss'

export const EndGameScreen = ({ winnerName, winnerId }) => {
  const { user } = useUser()
  const {
    setXpEarned,
    xpEarned,
    setCoinsEarned,
    coinsEarned,
    gemsEarned,
    setGemsEarned,
  } = useGame()

  useEffect(() => {
    setCoinsEarned(coinsEarned + 20)
    setXpEarned(xpEarned + 80)
    if (winnerName === user.username) {
      setGemsEarned(gemsEarned + 5)
    }
  }, [])

  return (
    <div className={styles.endGameContainer}>
      <div className={styles.winner}>
        {winnerId === user.user_id ? (
          <h3>GANASTE</h3>
        ) : (
          <>
            <h3>PERDISTE</h3>
            <p>GANADOR</p>
            <p>{winnerName}</p>
          </>
        )}
      </div>

      <LevelUp winnerName={winnerName} />

      <section className={styles.rewardContainer}>
        //TODO: ADD BACK BUTTON
        <div className={styles.backContainer}>
          <i className='ri-close-fill'></i>
        </div>
        <h3>RECOMPENSA</h3>
        <p>XP: {xpEarned}</p>
        <p>COINS: {coinsEarned}</p>
        <p>GEMS: {gemsEarned}</p>
        {/* <Button text={'DUPLICAR'} />
        <LinkBtn text={'NO GRACIAS'} type='button' /> */}
      </section>
    </div>
  )
}
