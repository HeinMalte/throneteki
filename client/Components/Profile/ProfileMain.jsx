import React, { useCallback } from 'react';
import Panel from '../Site/Panel';
import { useUpdateAvatarMutation } from '../../redux/middleware/api';

import { Avatar, Button, Input, Link, Switch } from '@heroui/react';
import { toast } from 'react-toastify';

const ProfileMain = ({ user, formProps }) => {
    const [updateAvatar, { isLoading: avatarLoading }] = useUpdateAvatarMutation();

    const onUpdateAvatarClick = useCallback(async () => {
        try {
            await updateAvatar(user.username).unwrap();
            toast.success('Profilbild aktualisiert.');
        } catch (err) {
            toast.error(err.message || 'Das Profilbild konnte nicht aktualisiert werden.');
        }
    }, [updateAvatar, user?.username]);

    return (
        <Panel title={`Konto von ${user.username}`}>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <Input
                        {...formProps.getFieldProps('email')}
                        label='E-Mail'
                        isInvalid={formProps.errors.email && formProps.touched.email}
                        errorMessage={formProps.errors.email}
                    />
                    <Input
                        label='Aktuelles Passwort'
                        description='Nur nötig, wenn du E-Mail oder Passwort änderst'
                        {...formProps.getFieldProps('currentPassword')}
                        type='password'
                        autoComplete='current-password'
                    />
                    <Input
                        label='Neues Passwort'
                        {...formProps.getFieldProps('password')}
                        isInvalid={formProps.errors.password && formProps.touched.password}
                        errorMessage={formProps.errors.password}
                        type='password'
                    />
                    <Input
                        label='Neues Passwort (wiederholen)'
                        {...formProps.getFieldProps('passwordAgain')}
                        isInvalid={
                            formProps.errors.passwordAgain && formProps.touched.passwordAgain
                        }
                        errorMessage={formProps.errors.passwordAgain}
                        type='password'
                    />
                </div>
                <Switch
                    isSelected={formProps.values.emailUpdates}
                    onValueChange={(isSelected) =>
                        formProps.setFieldValue('emailUpdates', isSelected)
                    }
                >
                    Gelegentliche Neuigkeiten per E-Mail erhalten
                </Switch>
                <div className='flex flex-col md:flex-row gap-2'>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='font-bold'>Profilbild</label>
                        <p className='text-sm'>
                            Dein Profilbild kommt von{' '}
                            <Link href='https://gravatar.com/' size='sm'>
                                Gravatar
                            </Link>
                            . Dort muss dieselbe E-Mail-Adresse hinterlegt sein wie hier.
                        </p>
                        <div className='flex flex-wrap gap-2 items-center'>
                            <Avatar src={`/img/avatar/${user.username}.png`} showFallback />
                            <Button
                                isLoading={avatarLoading}
                                type='button'
                                color='default'
                                isDisabled={!formProps.values.enableGravatar}
                                onPress={onUpdateAvatarClick}
                            >
                                Profilbild aktualisieren
                            </Button>
                            <Switch
                                {...formProps.getFieldProps('enableGravatar')}
                                isSelected={formProps.values.enableGravatar}
                            >
                                Gravatar verwenden
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default ProfileMain;
