export const FactionNamesDe = {
    baratheon: 'Haus Baratheon',
    greyjoy: 'Haus Graufreud',
    lannister: 'Haus Lennister',
    martell: 'Haus Martell',
    thenightswatch: 'Die Nachtwache',
    stark: 'Haus Stark',
    targaryen: 'Haus Targaryen',
    tyrell: 'Haus Tyrell',
    neutral: 'Neutral'
};

export const CardTypeNamesDe = {
    title: 'Titel',
    agenda: 'Agenda',
    plot: 'Strategie',
    character: 'Charakter',
    attachment: 'Verstärkung',
    location: 'Ort',
    event: 'Ereignis'
};

export const CardTypePluralDe = {
    title: 'Titel',
    agenda: 'Agenda',
    plot: 'Strategiekarten',
    character: 'Charaktere',
    attachment: 'Verstärkungen',
    location: 'Orte',
    event: 'Ereignisse'
};

export const DeckStatusLabelsDe = {
    Invalid: 'Ungültig',
    'Not Legal': 'Nicht turnierlegal',
    Casual: 'Freies Spiel',
    Legal: 'Gültig',
    'Loading...': 'Wird geladen …'
};

export const factionNameDe = (faction) =>
    FactionNamesDe[faction?.value || faction] || faction?.name || '';

// Deck errors come from the shared deck-helper in English; translate the known patterns for display.
const FactionWordsDe = {
    Baratheon: 'Baratheon',
    Greyjoy: 'Graufreud',
    Lannister: 'Lennister',
    Martell: 'Martell',
    "Night's Watch": 'Nachtwache',
    Stark: 'Stark',
    Targaryen: 'Targaryen',
    Tyrell: 'Tyrell'
};

const deckErrorPatterns = [
    [/^Deck cannot be used in this format\/variant$/, () => 'Deck passt nicht zu diesem Format'],
    [/^Too few plot cards$/, () => 'Zu wenige Strategiekarten (genau 7 nötig)'],
    [/^Too many plot cards$/, () => 'Zu viele Strategiekarten (genau 7 nötig)'],
    [/^Too few draw cards$/, () => 'Zu wenige Karten im Nachziehstapel (mindestens 60)'],
    [
        /^Cards not allowed by faction or agenda: (.+)$/,
        (m) => `Passt nicht zu Fraktion oder Agenda: ${m[1]}`
    ],
    [/^Cards are not yet released: (.+)$/, (m) => `Noch nicht erschienen: ${m[1]}`],
    [
        /^Maximum allowed number of doubled plots: (\d+)$/,
        (m) => `Höchstens ${m[1]} Strategiekarte(n) doppelt erlaubt`
    ],
    [/^(.+) has limit (\d+)$/, (m) => `${m[1]}: höchstens ${m[2]} Kopien erlaubt`],
    [
        /^Must contain 12 or more (.+) cards$/,
        (m) => `Mindestens 12 ${FactionWordsDe[m[1]] || m[1]}-Karten nötig`
    ],
    [
        /^You cannot include more than 15 neutral cards in a deck with Fealty$/,
        () => 'Lehnstreue: höchstens 15 neutrale Karten'
    ],
    [
        /^Kings of Summer cannot include Winter plot cards$/,
        () => 'Sommerkönige: keine Winter-Strategiekarten erlaubt'
    ],
    [
        /^Kings of Winter cannot include Summer plot cards$/,
        () => 'Winterkönige: keine Sommer-Strategiekarten erlaubt'
    ],
    [
        /^Rains of Castamere must contain exactly 5 different Scheme plots$/,
        () => 'Castamere: genau 5 verschiedene Komplott-Strategien nötig'
    ],
    [
        /^Alliance cannot have more than 2 Banner agendas$/,
        () => 'Allianz: höchstens 2 Banner-Agenden'
    ],
    [
        /^The Brotherhood Without Banners cannot include loyal characters$/,
        () => 'Bruderschaft ohne Banner: keine loyalen Charaktere erlaubt'
    ],
    [
        /^Must contain 12 or more Maester characters$/,
        () => 'Mindestens 12 Maester-Charaktere nötig'
    ],
    [
        /^Must contain 7 or more different Kingsguard characters$/,
        () => 'Mindestens 7 verschiedene Königsgarde-Charaktere nötig'
    ],
    [
        /^Cannot include more than 1 copy of each attachment(?: \(by title\))?$/,
        () => 'Jede Verstärkung höchstens 1-mal'
    ],
    [
        /^Cannot include more than 1 copy of each event \(by title\)$/,
        () => 'Jedes Ereignis höchstens 1-mal'
    ],
    [
        /^Must only contain neutral cards or Non-loyal Wildling characters$/,
        () => 'Nur neutrale Karten oder nicht-loyale Wildlinge erlaubt'
    ],
    [
        /^(.+) - Contains more than 1 card on the restricted list: (.+)$/,
        (m) => `${m[1]}: mehr als 1 Karte der Restricted List: ${m[2]}`
    ],
    [
        /^(.+) - Contains cards on the banned list: (.+)$/,
        (m) => `${m[1]}: Karten der Bannliste: ${m[2]}`
    ]
];

export function translateDeckError(error) {
    if (typeof error !== 'string') {
        return error;
    }
    for (const [pattern, format] of deckErrorPatterns) {
        const match = error.match(pattern);
        if (match) {
            return format(match);
        }
    }
    return error;
}
