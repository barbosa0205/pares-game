import React, { useEffect } from 'react'
import styles from './styles/place.module.scss'
export const Place = ({ placeNum }) => {
    const switchPlace = () => {
        switch (placeNum) {
            case 1:
                return `${styles.place} ${styles.place1}`

            case 2:
                return `${styles.place} ${styles.place2}`

            case 3:
                return `${styles.place} ${styles.place3}`

            case 4:
                return `${styles.place} ${styles.place4}`

            case 5:
                return `${styles.place} ${styles.place5}`

            case 6:
                return `${styles.place} ${styles.place6}`

            default:
                break
        }
    }

    const fetchData = async () => {
        const data = await fetch('https://randomuser.me/api/')
        const res = await data.json()
        const img = await res.results[0].picture.large
        return img
    }

    return <div className={switchPlace()}></div>
}
