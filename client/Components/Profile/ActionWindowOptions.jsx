import { Switch } from '@heroui/react';
import React, { useMemo } from 'react';
import Panel from '../Site/Panel';

const windows = [
    { name: 'plot', label: 'Strategien aufgedeckt' },
    { name: 'draw', label: 'Nachziehphase' },
    { name: 'marshal', label: 'Aufmarschphase' },
    { name: 'challengeBegin', label: 'Vor jeder Herausforderung' },
    { name: 'attackersDeclared', label: 'Angreifer erklärt' },
    { name: 'defendersDeclared', label: 'Verteidiger erklärt' },
    { name: 'dominance', label: 'Herrschaftsphase' },
    { name: 'standing', label: 'Aufrichtphase' },
    { name: 'taxation', label: 'Abgabenphase' }
];

// eslint-disable-next-line react/display-name
const ActionWindowOptions = ({ formProps }) => {
    const retWindows = useMemo(() => {
        return windows.map((window) => {
            return (
                <Switch
                    key={window.name}
                    {...formProps.getFieldProps(`actionWindows.${window.name}`)}
                    isSelected={formProps.values.actionWindows[window.name]}
                >
                    {window.label}
                </Switch>
            );
        });
    }, [formProps]);

    return (
        <Panel title='Wann soll das Spiel für Aktionen anhalten?'>
            <div className='flex flex-col gap-2'>
                <p className='text-sm'>
                    Eingeschaltet: Das Spiel fragt dich an dieser Stelle immer, ob du eine Aktion
                    spielen möchtest. Ausgeschaltet: Keine Nachfrage, der Schritt läuft durch. Tipp:
                    Für den Anfang reichen „Vor jeder Herausforderung“ und „Angreifer erklärt“.
                </p>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>{retWindows}</div>
            </div>
        </Panel>
    );
};

export default ActionWindowOptions;
