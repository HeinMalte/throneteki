import React from 'react';
import { cardLabelDe } from '../../cardNamesDe';

const CardLink = ({ card, onClick, onMouseOut, onMouseOver }) => {
    return (
        <span
            className='card-link'
            onClick={() => onClick && onClick(card)}
            onMouseOver={() => onMouseOver && onMouseOver(card)}
            onMouseOut={() => onMouseOut && onMouseOut(card)}
        >
            {cardLabelDe(card)}
        </span>
    );
};

export default CardLink;
