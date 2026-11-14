import React, { useMemo } from 'react';

import TypeaheadLookup from './TypeaheadLookup';
import { cardNameDe } from '../../cardNamesDe';

const CardNameLookup = ({ cards, onValueSelected }) => {
    const englishByShownName = useMemo(() => {
        const map = new Map();
        for (const card of Object.values(cards)) {
            const shown = cardNameDe(card);
            if (!map.has(shown)) {
                map.set(shown, card.name);
            }
        }
        return map;
    }, [cards]);

    return (
        <TypeaheadLookup
            values={[...englishByShownName.keys()]}
            onValueSelected={(value) => onValueSelected(englishByShownName.get(value) || value)}
        />
    );
};

export default CardNameLookup;
