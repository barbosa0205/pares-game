import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/user/useUser'

export const PrivateRoute = ({ children }) => {
    const { user, isLogged } = useUser()

    return isLogged() ? children : <Navigate to="/login" />
}
