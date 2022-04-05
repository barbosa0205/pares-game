import React from 'react'
import styles from './styles/layout.module.scss'

export const Layout = ({ children }) => {
  return <main className={styles.mainContainer}>{children}</main>
}
