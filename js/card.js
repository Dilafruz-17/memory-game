import { shuffle } from './shuffle.js';

const CARD_FACES = [
    { id: 'apple', image: './assets/images/apple.svg', alt: 'Apple' },
    { id: 'banana', image: './assets/images/banana.svg', alt: 'Banana' },
    { id: 'cherry', image: './assets/images/cherry.svg', alt: 'Cherry' },
    { id: 'grape', image: './assets/images/grape.svg', alt: 'Grape' },
    { id: 'lemon', image: './assets/images/lemon.svg', alt: 'Lemon' },
    { id: 'orange', image: './assets/images/orange.svg', alt: 'Orange' },
    { id: 'peach', image: './assets/images/peach.svg', alt: 'Peach' },
    { id: 'strawberry', image: './assets/images/strawberry.svg', alt: 'Strawberry' },
];

export function createDeck() {
    const pairs = CARD_FACES.flatMap((face) => [
        { ...face, uid: `${face.id}-1` },
        { ...face, uid: `${face.id}-2` },
    ]);

    return shuffle(pairs);
}