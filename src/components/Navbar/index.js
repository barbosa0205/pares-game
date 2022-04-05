import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import styles from './styles/navbar.module.scss'
export const Navbar = () => {
  return (
    <nav className={styles.mainContainer}>
      <NavLink
        className={({ isActive }) => '' + (isActive ? styles.active : null)}
        to='/store'
      >
        <Icon className='ri-shopping-cart-line' />
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : null)}
        to='/friends'
      >
        <Icon className='ri-group-line' />
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : null)}
        to='/'
      >
        <Icon className='ri-home-4-line' />
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : null)}
        to='/locker'
      >
        <Icon className='ri-fridge-line' />
      </NavLink>
    </nav>
  )
}
