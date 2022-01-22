import React from 'react'

import styles from './styles/icon.module.scss'

export const Icon = ({ children, ...rest }) => {
    return <i {...rest}>{children}</i>
}
