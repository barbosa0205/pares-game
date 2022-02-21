import random from '../../../node_modules/random/dist/cjs/index'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/miniavs'
import * as style2 from '@dicebear/avatars-avataaars-sprites'
import * as style3 from '@dicebear/micah'
import * as style4 from '@dicebear/big-smile'
import * as style5 from '@dicebear/open-peeps'

export const getRandomAvatar = () => {
    const num = random.int(1, 4)
    switch (num) {
        case 1:
            const svg = createAvatar(style, {
                dataUri: true,
                backgroundColor: '#ffffff00',
            })
            return svg
        case 2:
            const svg2 = createAvatar(style2, {
                dataUri: true,
                backgroundColor: '#ffffff00',
            })
            return svg2
        case 3:
            const svg3 = createAvatar(style3, {
                dataUri: true,
                backgroundColor: '#ffffff00',
            })
            return svg3
        case 4:
            const svg4 = createAvatar(style4, {
                dataUri: true,
                backgroundColor: '#ffffff00',
            })
            return svg4
        default:
            const svg5 = createAvatar(style5, {
                dataUri: true,
                backgroundColor: '#ffffff00',
            })
            return svg5
    }
}
