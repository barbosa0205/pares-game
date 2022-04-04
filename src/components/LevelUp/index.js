import React from 'react'
import { useGame } from '../../contexts/game/useGame'
import { useUser } from '../../contexts/user/useUser'
import { getIdByUserID } from '../../helpers/get'
import { updateUserById } from '../../helpers/update'
import styles from './styles/levelUp.module.scss'
export const LevelUp = ({ winnerName }) => {
  const { user, setUser } = useUser()
  const { xpEarned, coinsEarned, gemsEarned } = useGame()

  const [porcentage, setPorcentage] = React.useState(0)
  const [lvl, setLvl] = React.useState(user.level)

  const levelUp = async (xp, xp_earned, xpToLevelUp, level) => {
    console.log('levelUp')
    setPorcentage(0)
    const restOfXp = xp_earned - xpToLevelUp
    const newXpNeeded = (user.xp_needed * 2.3).toFixed(0)
    setLvl(level + 1)
    const newXp = xp + xpToLevelUp + restOfXp
    console.log('newXp', newXp, 'xp', xp)
    const id = await getIdByUserID(user.user_id)
    const newPorcent = ((newXp / newXpNeeded) * 100).toFixed(2)
    setPorcentage(newPorcent)
    updateUserById(id, {
      level: level + 1,
      xp: newXp,
      xp_needed: newXpNeeded,
    })

    // if (restOfXp > newXpNeeded) {
    //   console.log('WTF')
    //   levelUp(restOfXp, user.xp_needed, level + 1)
    // } else {
    //   const newPorcent = (((newXp + restOfXp) / newXpNeeded) * 100).toFixed(2)
    //   setPorcentage(newPorcent)
    //   updateUserById(id, {
    //     xp: xp + restOfXp,
    //   })
    //   setUser({
    //     ...user,
    //     xp: xp + restOfXp,
    //   })
    // }
  }

  React.useEffect(() => {
    ;(async () => {
      const xp = user.xp
      const level = user.level
      const xp_needed = user.xp_needed
      const xpToLevelUp = xp_needed - xp
      const xp_earned = xpEarned + 80
      console.log(xp_earned)

      const porcent = (((xp + xp_earned) / xp_needed) * 100).toFixed(2)
      setPorcentage(porcent)

      if (xp_earned >= xpToLevelUp) {
        levelUp(xp, xp_earned, xpToLevelUp, level)
      } else {
        console.log(user.xp)
        const id = await getIdByUserID(user.user_id)
        if (user.username === winnerName) {
          updateUserById(id, {
            xp: xp + xp_earned,
            coins: user.coins + coinsEarned + 20,
            gems: user.gems + gemsEarned + 5,
          })
        } else {
          updateUserById(id, {
            xp: xp + xp_earned,
            coins: user.coins + coinsEarned + 20,
          })
        }
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <h3>{lvl}</h3>
      <div className={styles.progressBar}>
        <div
          style={{
            width: `${porcentage || 0}%`,
          }}
          className={styles.progress}
        ></div>
      </div>
    </div>
  )
}
