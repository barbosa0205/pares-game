import React, { useEffect } from 'react'
import { useUser } from '../../contexts/user/useUser'

import styles from './styles/progrssBar.module.scss'

export const ProgressBar = () => {
  const { user } = useUser()

  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    const xp = user.xp
    const level = user.level
    const xp_needed = user.xp_needed
    setProgress(((xp / xp_needed) * 100).toFixed(2))
  }, [])

  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
