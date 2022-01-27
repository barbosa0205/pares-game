const deck = []
const figures = ['♥', '♦', '♣', '♠']
const numbers = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
]
export const generateDeackOfCards = () => {
    figures.forEach(figure => {
        numbers.forEach(number => {
            deck.push({
                figure: figure,
                number: number,
            })
        })
    })
    return deck
}
