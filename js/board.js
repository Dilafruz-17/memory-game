import { createElement } from './dom.js';

function createCardElement(card) {
    const image = createElement('img', {
        className: 'card__image',
        attrs: { src: card.image, alt: card.alt },
    });

    return createElement(
        'button',
        {
            className: 'card',
            attrs: {
                type: 'button',
                'data-uid': card.uid,
                'data-id': card.id,
                'aria-label': 'Card',
            },
        },
        [image],
    );
}

export function renderBoard(boardElement, deck) {
    const cards = deck.map(createCardElement);
    boardElement.replaceChildren(...cards);
}

export function setCardState(boardElement, uids, className, isOn) {
    uids.forEach((uid) => {
        const card = boardElement.querySelector(`[data-uid="${uid}"]`);
        if (card) card.classList.toggle(className, isOn);
    });
}