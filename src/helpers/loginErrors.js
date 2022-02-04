export const getError = code => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Email ya está en uso'
        case 'auth/invalid-email':
            return 'Email inválido'
        case 'auth/user-not-found':
            return 'Usuario no encontrado'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        default:
            return 'Error inesperado'
    }
}
