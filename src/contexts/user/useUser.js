import { useContext } from 'react'
import { userCtxt } from './UserProvider'

export const useUser = () => {
    const contextValue = useContext(userCtxt)
    return contextValue
}
