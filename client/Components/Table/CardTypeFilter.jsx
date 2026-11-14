import { ButtonGroup, Tooltip } from '@heroui/react';
import React from 'react';
import { Constants } from '../../constants';
import { SmallButton } from '../Site/Variants';
import ThronesIcon from '../GameBoard/ThronesIcon';
import { CardTypeNamesDe } from '../../i18n';

const CardTypeFilter = ({ className, filter, setFilter, types = Constants.CardTypes }) => {
    return (
        <ButtonGroup className={className}>
            {types.map((type) => {
                return (
                    <Tooltip
                        key={type.value}
                        content={CardTypeNamesDe[type.value] || type.name}
                        closeDelay={0}
                    >
                        <SmallButton
                            aria-label={CardTypeNamesDe[type.value] || type.name}
                            size='xs'
                            color={filter.some((t) => t === type.value) ? 'primary' : null}
                            onPress={() =>
                                setFilter(
                                    filter.some((t) => t === type.value)
                                        ? filter.filter((t) => t !== type.value)
                                        : filter.concat(type.value)
                                )
                            }
                        >
                            <ThronesIcon icon={type.value} />
                        </SmallButton>
                    </Tooltip>
                );
            })}
        </ButtonGroup>
    );
};

export default CardTypeFilter;
