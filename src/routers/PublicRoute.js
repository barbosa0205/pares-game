import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/user/useUser'

export const PublicRoute = ({ children }) => {
    const { isLogged } = useUser()
    return !isLogged() ? children : <Navigate to="/" />
}
