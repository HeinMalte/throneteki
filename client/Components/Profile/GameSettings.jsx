import React from 'react';
import Panel from '../Site/Panel';
import { Switch } from '@heroui/react';

const settings = [
    {
        name: 'chooseOrder',
        label: 'Reihenfolge der Schlüsselwörter selbst wählen',
        description: 'z. B. ob erst „Ruhmreich“ oder erst „Einblick“ abgehandelt wird'
    },
    {
        name: 'chooseCards',
        label: 'Vor Herausforderungs-Schlüsselwörtern nachfragen',
        description: 'Du entscheidest bei Einblick, Brandschatzen usw. selbst, statt automatisch'
    },
    {
        name: 'promptDupes',
        label: 'Vor dem Retten mit Duplikaten nachfragen',
        description: 'Sonst wird ein Duplikat automatisch abgelegt, um die Karte zu retten'
    },
    {
        name: 'hideInterrupts',
        label: 'Verbergen, ob ich Unterbrechungen habe',
        description: 'Das Spiel hält trotzdem kurz an, damit Gegner nichts ablesen können'
    },
    {
        name: 'hideReactions',
        label: 'Verbergen, ob ich Reaktionen habe',
        description: 'Wie oben, nur für Reaktionen'
    },
    {
        name: 'keyboardShortcuts',
        label: 'Tastenkürzel im Spiel',
        description: 'Z. B. Leertaste für „Fertig“'
    }
];

const GameSettings = ({ formProps }) => {
    return (
        <Panel title='Spieleinstellungen'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {settings.map((setting) => (
                    <Switch
                        key={setting.name}
                        {...formProps.getFieldProps(setting.name)}
                        isSelected={formProps.values[setting.name]}
                        classNames={{ base: 'max-w-none items-start', wrapper: 'mt-0.5' }}
                    >
                        <div className='flex flex-col'>
                            <span>{setting.label}</span>
                            <span className='text-xs text-default-500'>{setting.description}</span>
                        </div>
                    </Switch>
                ))}
            </div>
        </Panel>
    );
};

export default GameSettings;
