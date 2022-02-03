import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/miniavs'
export const getRandomAvatar = () => {
    const svg = createAvatar(style, {
        dataUri: true,
        backgroundColor: '#ffffff00',
    })
    return svg
}
