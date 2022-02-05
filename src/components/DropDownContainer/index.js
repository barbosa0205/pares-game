import React, { useState } from 'react'
import styles from './styles/dropDownContainer.module.scss'
export const DropDownContainer = ({ children, text }) => {
    const [dropDown, setDropDown] = useState(false)
    return (
        <>
            <div
                className={`${styles.dropDownContainer} ${
                    dropDown ? styles.open : styles.close
                }`}
            >
                <h2
                    className={styles.subtitle}
                    onClick={() => setDropDown(!dropDown)}
                >
                    {text}
                    <i className="ri-arrow-down-s-line"></i>
                </h2>
                {children}
            </div>
        </>
    )
}
