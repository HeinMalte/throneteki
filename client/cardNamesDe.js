import namesDe from './assets/data/cardNamesDe.json';

const packSuffix = / \([^()]+\)$/;

export function cardNameDe(card) {
    if (!card) {
        return '';
    }
    return namesDe[card.code] || card.name || '';
}

export function cardLabelDe(card) {
    if (!card) {
        return '';
    }
    const german = namesDe[card.code];
    const label = card.label || card.name || '';
    if (!german) {
        return label;
    }
    const suffix = label.match(packSuffix);
    return suffix ? german + suffix[0] : german;
}

export function matchesCardName(card, search) {
    const term = (search || '').toLowerCase();
    return (
        cardLabelDe(card).toLowerCase().includes(term) ||
        (card.label || card.name || '').toLowerCase().includes(term)
    );
}
