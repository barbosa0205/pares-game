import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import PropTypes from 'prop-types'
import styles from './styles/playerNotify.module.scss'
export const PlayerNotify = ({ data, message }) => {
  const props = useSpring({
    from: {
      x: 150,
      y: 0,
      opacity: 0,
    },
    to: async (next, cancel) => {
      await next({ x: 0, y: 0, opacity: 1 })
      await next({ x: 150, delay: 1000 })
    },
  })
  return (
    <animated.div style={props} className={styles.playerNotifyContainer}>
      <div className={styles.userContainer}>
        <img src={data.image} alt={`${data.username} profile`} />
        <p>{data.username}</p>
      </div>
      <p className={styles.messageStyle}>{message}</p>
    </animated.div>
  )
}

PlayerNotify.propTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
}
