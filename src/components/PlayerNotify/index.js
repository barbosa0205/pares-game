import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/playerNotify.module.scss'
export const PlayerNotify = ({ data, message }) => {
    return (
        <div className={styles.playerNotifyContainer}>
            <div className={styles.userContainer}>
                <img src={data.image} alt={`${data.username} profile`} />
                <p>{data.username}</p>
            </div>
            <p className={styles.messageStyle}>{message}</p>
        </div>
    )
}

PlayerNotify.propTypes = {
    data: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
}
