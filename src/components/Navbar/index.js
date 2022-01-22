import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import styles from './styles/navbar.module.scss'
export const Navbar = () => {
    return (
        <nav className={styles.mainContainer}>
            <NavLink
                className={({ isActive }) =>
                    '' + (isActive ? styles.active : undefined)
                }
                to="/store"
            >
                <Icon className="ri-shopping-cart-line" />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? styles.active : undefined
                }
                to="/friends"
            >
                <Icon className="ri-group-line" />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? styles.active : undefined
                }
                to="/"
            >
                <Icon className="ri-home-4-line" />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? styles.active : undefined
                }
                to="/locker"
            >
                <Icon className="ri-fridge-line" />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? styles.active : undefined
                }
                to="/settings"
            >
                <Icon className="ri-settings-3-line" />
            </NavLink>
        </nav>
    )
}
