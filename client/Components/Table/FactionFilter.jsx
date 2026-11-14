import { ButtonGroup, Tooltip } from '@heroui/react';
import React from 'react';
import { Constants } from '../../constants';
import { SmallButton } from '../Site/Variants';
import ThronesIcon from '../GameBoard/ThronesIcon';
import { FactionNamesDe } from '../../i18n';

const FactionFilter = ({ className, filter, setFilter, factions = Constants.Factions }) => {
    return (
        <ButtonGroup className={className}>
            {factions.map((faction) => {
                return (
                    <Tooltip
                        key={faction.value}
                        content={FactionNamesDe[faction.value] || faction.name}
                        closeDelay={0}
                    >
                        <SmallButton
                            aria-label={FactionNamesDe[faction.value] || faction.name}
                            size='xs'
                            color={filter.some((f) => f === faction.value) ? 'primary' : null}
                            onPress={() =>
                                setFilter(
                                    filter.some((f) => f === faction.value)
                                        ? filter.filter((f) => f !== faction.value)
                                        : filter.concat(faction.value)
                                )
                            }
                        >
                            <ThronesIcon icon={faction.value} />
                        </SmallButton>
                    </Tooltip>
                );
            })}
        </ButtonGroup>
    );
};

export default FactionFilter;
