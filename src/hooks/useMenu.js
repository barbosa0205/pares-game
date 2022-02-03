import { useState } from 'react'
import PropTypes from 'prop-types'
export const useMenu = value => {
    const [menu, setMenu] = useState(value)

    const toggleMenu = () => setMenu(!menu)

    return [menu, toggleMenu]
}

useMenu.propTypes = {
    value: PropTypes.bool.isRequired,
}
