import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import styles from './styles/navbar.module.scss'
export const Navbar = () => {
    return (
        <nav className={styles.mainContainer}>
            <NavLink
                to="/store"
                className={isActive => isActive && styles.active}
            >
                <Icon className="ri-shopping-cart-line" />
            </NavLink>
            <NavLink
                to="/friends"
                className={isActive => isActive && styles.active}
            >
                <Icon className="ri-group-line" />
            </NavLink>
            <NavLink to="/" className={isActive => isActive && styles.active}>
                <Icon className="ri-home-4-line" />
            </NavLink>
            <NavLink
                to="/settings"
                className={isActive => isActive && styles.active}
            >
                <Icon className="ri-settings-3-line" />
            </NavLink>
        </nav>
    )
}
