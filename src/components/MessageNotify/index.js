import React from 'react'
import styles from './styles/messageNotify.module.scss'
import { useSpring, animated, config } from '@react-spring/web'
export const MessageNotify = ({ position, children }) => {
  const props = useSpring({
    from: {
      scale: 0,
    },
    to: async (next, cancel) => {
      await next({ scale: 1 })
      await next({ scale: 0, delay: 2000 })
    },
  })

  return (
    <>
      <animated.div
        style={props}
        className={`${styles.messageNotifyContainer} ${
          position === 'center' ? styles.center : ''
        } ${position === 'left' ? styles.left : ''} ${
          position === 'right' ? styles.right : ''
        } ${position === 'center-right' ? styles.centerRight : ''}`}
      >
        {children}
      </animated.div>
    </>
  )
}
