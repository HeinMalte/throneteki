import React, { useMemo, useState } from 'react';
import { cardLabelDe } from '../../cardNamesDe';
import CardImage from '../Images/CardImage';
import AlertPanel from '../Site/AlertPanel';
import { Button } from '@heroui/react';
import { useGetCardsQuery } from '../../redux/middleware/api';
import LoadingSpinner from '../Site/LoadingSpinner';
import CardHoverable from '../Images/CardHoverable';

const AgendaSelectStep = ({ onBackClick, onNextClick }) => {
    const { data, isLoading, isError } = useGetCardsQuery({});
    const [selectedAgendas, setAgendas] = useState([]);
    const agendas = useMemo(() => {
        if (!data) {
            return [];
        }

        const agendas = Object.values(data).filter((c) => c.type === 'agenda');

        return agendas.sort((a, b) => cardLabelDe(a).localeCompare(cardLabelDe(b), 'de'));
    }, [data]);

    const canSelectAgenda = (agendaCode) => {
        if (selectedAgendas.some((a) => a.code === agendaCode)) {
            return true;
        }

        if (selectedAgendas.length > 2) {
            return false;
        }

        if (selectedAgendas.length > 0 && selectedAgendas.some((a) => a.code === '06018')) {
            const card = agendas.find((a) => a.code === agendaCode);

            return card?.traits.some((t) => t === 'Banner');
        }

        return selectedAgendas.length == 0;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (isError) {
        return (
            <AlertPanel variant='danger'>
                Die Daten konnten nicht geladen werden. Bitte versuche es später noch einmal.
            </AlertPanel>
        );
    }

    return (
        <>
            <div className='mb-2 flex flex-wrap items-center gap-3'>
                <Button color='default' onPress={() => onBackClick()}>
                    Zurück
                </Button>
                <Button color='primary' onPress={() => onNextClick(selectedAgendas)}>
                    {selectedAgendas.length > 0 ? 'Weiter' : 'Ohne Agenda weiter'}
                </Button>
                <span className='text-sm text-default-500'>
                    Wähle eine Agenda (optional). Mit der Agenda „Allianz“ kannst du zusätzlich bis
                    zu 2 Banner wählen.
                </span>
            </div>
            <div className='grid h-[75vh] grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 overflow-y-auto'>
                {agendas.map((agenda) => (
                    <div key={agenda.code} className='m-2 flex content-center'>
                        <div
                            className='flex w-min flex-col items-center'
                            role={canSelectAgenda(agenda.code) ? 'button' : undefined}
                            onPointerDown={() => {
                                if (!canSelectAgenda(agenda.code)) {
                                    return;
                                }

                                const isSelected = selectedAgendas.some(
                                    (a) => a.code === agenda.code
                                );

                                setAgendas(
                                    isSelected
                                        ? selectedAgendas.filter((a) => a.code !== agenda.code)
                                        : selectedAgendas.concat(agenda)
                                );
                            }}
                        >
                            <CardHoverable code={agenda.code}>
                                <CardImage
                                    code={agenda.code}
                                    size='large'
                                    className={
                                        selectedAgendas.some((a) => a.code === agenda.code) &&
                                        'outline outline-4 outline-green-600'
                                    }
                                />
                            </CardHoverable>
                            <div className='mt-1 w-full text-center text-xs leading-tight text-default-600'>
                                {cardLabelDe(agenda)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AgendaSelectStep;
