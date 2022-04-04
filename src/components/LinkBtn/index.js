import React from 'react'

import styles from './styles/linkBtn.module.scss'

export const LinkBtn = ({text, type}) => {
  return (
    <button className={styles.linkBtn} type={type}>{text}</button>
  )
}
