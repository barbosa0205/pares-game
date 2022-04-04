import React from 'react'
import styles from './styles/comingSoon.module.scss'
export const ComingSoon = ({ text }) => {
  return (
    <div className={styles.container}>
      <h1>{text} ComingSoon</h1>
    </div>
  )
}
