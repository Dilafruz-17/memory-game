import { shuffle } from './shuffle.js';

const CARD_FACES = [
    { id: 'apple', image: './assets/images/apple.png', alt: 'Apple' },
    { id: 'banana', image: './assets/images/banana.png', alt: 'Banana' },
    { id: 'cherry', image: './assets/images/cherry.png', alt: 'Cherry' },
    { id: 'grape', image: './assets/images/grape.png', alt: 'Grape' },
    { id: 'lemon', image: './assets/images/lemon.png', alt: 'Lemon' },
    { id: 'orange', image: './assets/images/orange.png', alt: 'Orange' },
    { id: 'peach', image: './assets/images/peach.png', alt: 'Peach' },
    { id: 'strawberry', image: './assets/images/strawberry.png', alt: 'Strawberry' },
];

export function createDeck() {
    const pairs = CARD_FACES.flatMap((face) => [
        { ...face, uid: `${face.id}-1` },
        { ...face, uid: `${face.id}-2` },
    ]);

    return shuffle(pairs);
}