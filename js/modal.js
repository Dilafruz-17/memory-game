import { createElement } from './dom.js';

let activeOverlay = null;
let inertElements = [];

function handleKeydown(event) {
    if (event.key === 'Escape') closeModal();
}

export function closeModal() {
    if (!activeOverlay) return;

    activeOverlay.remove();
    activeOverlay = null;
    inertElements.forEach((element) => element.removeAttribute('inert'));
    inertElements = [];
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handleKeydown);
}

export function openModal({ title, content, actions = [] }) {
    closeModal();

    const buttons = actions.map(({ text, onClick }) =>
        createElement('button', {
            className: 'btn',
            text,
            attrs: { type: 'button' },
            on: { click: onClick },
        }),
    );

    const dialog = createElement(
        'div',
        { className: 'modal', attrs: { role: 'dialog', 'aria-modal': 'true' } },
        [
            createElement('h2', { className: 'modal__title', text: title }),
            createElement('div', { className: 'modal__content' }, [content]),
            createElement('div', { className: 'modal__actions' }, buttons),
        ],
    );

    activeOverlay = createElement(
        'div',
        {
            className: 'overlay',
            on: {
                click: (event) => {
                    if (event.target === activeOverlay) closeModal();
                },
            },
        },
        [dialog],
    );

    inertElements = [...document.body.children].filter(
        (element) => element.tagName !== 'SCRIPT',
    );
    inertElements.forEach((element) => element.setAttribute('inert', ''));

    document.body.append(activeOverlay);
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', handleKeydown);

    const firstButton = dialog.querySelector('button');
    if (firstButton) firstButton.focus();
}