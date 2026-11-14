import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DeckStatusSummary = ({ status }) => {
    const { basicRules, noUnreleasedCards, legality } = status;
    const items = [
        { title: 'Grundregeln für den Deckbau', value: basicRules },
        {
            title: `Kartenpool ${legality.name}`,
            value: legality.valid
        },
        { title: 'Nur erschienene Karten', value: noUnreleasedCards }
    ];

    return (
        <ul>
            {items.map((item, index) => (
                <li className={item.value ? 'text-success' : 'text-danger'} key={index}>
                    <FontAwesomeIcon icon={item.value ? faCheck : faXmark} />
                    {` ${item.title}`}
                </li>
            ))}
        </ul>
    );
};

export default DeckStatusSummary;
