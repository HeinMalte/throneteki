import React, { useEffect, useState } from 'react';
import { ThronesIcons } from '../../constants';
import ThronesIcon from '../GameBoard/ThronesIcon';

let cardTextPromise;
const loadCardText = () => {
    if (!cardTextPromise) {
        cardTextPromise = import('../../assets/data/cardTextDe.json').then(
            (module) => module.default
        );
    }
    return cardTextPromise;
};

const tokenPattern = /(<\/?(?:b|i|em)>|\[[a-z]+\]|\n)/;

const renderText = (text) => {
    const nodes = [];
    let bold = false;
    let italic = false;

    text.split(tokenPattern).forEach((token, index) => {
        if (!token) {
            return;
        }
        if (token === '<b>' || token === '</b>') {
            bold = token === '<b>';
        } else if (/^<\/?(i|em)>$/.test(token)) {
            italic = !token.startsWith('</');
        } else if (token === '\n') {
            nodes.push(<br key={index} />);
        } else if (/^\[[a-z]+\]$/.test(token) && ThronesIcons.includes(token.slice(1, -1))) {
            nodes.push(<ThronesIcon key={index} icon={token.slice(1, -1)} />);
        } else {
            let className = bold ? 'font-bold' : undefined;
            if (italic) {
                className = className ? `${className} italic` : 'italic';
            }
            nodes.push(
                <span key={index} className={className}>
                    {token}
                </span>
            );
        }
    });

    return nodes;
};

const CardTextDe = ({ code }) => {
    const [cardText, setCardText] = useState(null);

    useEffect(() => {
        let active = true;
        loadCardText().then((data) => {
            if (active) {
                setCardText(data);
            }
        });
        return () => {
            active = false;
        };
    }, []);

    const entry = cardText?.[code];
    if (!entry) {
        return null;
    }

    return (
        <div className='got-card-text mt-1.5 w-0 min-w-full rounded-lg px-3 py-2 text-sm leading-snug'>
            {entry.traits && <div className='mb-1 font-bold italic'>{entry.traits}</div>}
            <div>{renderText(entry.text)}</div>
        </div>
    );
};

export default CardTextDe;
