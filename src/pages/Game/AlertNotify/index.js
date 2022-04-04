import React from 'react'

import { animated, useSpring } from '@react-spring/web'

import styles from './styles/alertNotify.module.scss'

export const AlertNotify = ({ children }) => {
  const props = useSpring({
    from: { y: -100, opacity: 0 },
    to: async (next, cancel) => {
      await next({ y: 0, opacity: 1 })
      await next({ y: -100, opacity: 0, delay: 2000 })
    },
  })

  return (
    <animated.div style={props} className={styles.alertNotifyContainer}>
      {children}
    </animated.div>
  )
}
