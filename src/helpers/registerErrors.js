export const registerErrors = code => {
    switch (code) {
        case 'auth/invalid-email':
            return 'Email inválido'
            break
        case 'auth/email-already-in-use':
            return 'Email ya está en uso'
            break
        case 'auth/missing-email':
            return 'Email no puede estar vacío'
            break
        case 'auth/weak-password':
            return 'Contraseña muy débil'
            break
        default:
            return 'Error inesperado'
    }
}
