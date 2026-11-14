import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Button } from '@heroui/react';
import * as yup from 'yup';
import AlertPanel from '../Components/Site/AlertPanel';
import Panel from '../Components/Site/Panel';
import GameBackgroundOption from '../Components/Profile/GameBackgroundOption';
import { useSaveProfileMutation, useVerifyAuthenticationQuery } from '../redux/middleware/api';
import ProfileMain from '../Components/Profile/ProfileMain';
import ActionWindowOptions from '../Components/Profile/ActionWindowOptions';
import GameSettings from '../Components/Profile/GameSettings';
import BlankBg from '../assets/img/bgs/blank.webp';
import Background1 from '../assets/img/bgs/background.webp';
import Background2 from '../assets/img/bgs/background2.webp';
import ThroneRoomBg from '../assets/img/bgs/throneroom.webp';
import { setAuthTokens, setUser } from '../redux/reducers/auth';
import { toast } from 'react-toastify';
import CardSizeSettings from '../Components/Profile/CardSizeSettings';
import Page from './Page';
import { keyboardShortcutsEnabled } from '../Components/GameBoard/keyboardShortcuts';

const backgrounds = [
    { name: 'none', label: 'Kein Hintergrund', imageUrl: BlankBg },
    { name: 'BG1', label: 'Standard', imageUrl: Background1 },
    { name: 'BG2', label: 'Winter', imageUrl: Background2 },
    { name: 'GOT', label: 'Thronsaal', imageUrl: ThroneRoomBg }
];

const defaultActionWindows = {
    plot: false,
    draw: false,
    marshal: false,
    challengeBegin: false,
    attackersDeclared: true,
    defendersDeclared: true,
    dominance: false,
    standing: false,
    taxation: false
};

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [selectedBackground, setSelectedBackground] = useState(
        user?.settings.background || 'GOT'
    );

    const [saveProfile, { isLoading: isSaveLoading, error: saveError }] = useSaveProfileMutation();
    // The user in the store comes from the login token, which can be out of date (e.g. after unsubscribing from an
    // email), so load the account as it is now before building the form
    const { data: currentUser, isFetching: isLoadingUser } = useVerifyAuthenticationQuery('', {
        skip: !user,
        refetchOnMountOrArgChange: true
    });
    const emailUpdates = (currentUser ?? user)?.emailUpdates !== false;

    useEffect(() => {
        if (saveError) {
            toast.error(
                saveError.message ||
                    'Die Einstellungen konnten nicht gespeichert werden. Bitte versuche es später noch einmal.'
            );
        }
    }, [saveError]);

    useEffect(() => {
        setSelectedBackground(user?.settings?.background || 'GOT');
    }, [user?.settings?.background, user?.settings?.cardSize]);

    if (!user) {
        return (
            <AlertPanel
                variant='error'
                message='Bitte melde dich an, um deine Einstellungen zu ändern.'
            />
        );
    }

    if (isLoadingUser) {
        return <p className='py-6 text-center'>Wird geladen …</p>;
    }

    const schema = yup.object({
        // avatar: yup
        //     .mixed()
        //     .test(
        //         'fileSize',
        //         'Image must be less than 100KB in size',
        //         (value) => !value || value.size <= 100 * 1024
        //     )
        //     .test(
        //         'fileType',
        //         'Unsupported image format',
        //         (value) =>
        //             !value ||
        //             ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
        //     ),
        // username: yup
        //     .string()
        //     .required('You must specify a username')
        //     .min(3, 'Your username must be at least 3 characters long')
        //     .max(15, 'Your username cannot be more than 15 charcters')
        //     .matches(
        //         /^[A-Za-z0-9_-]+$/,
        //         'Usernames must only use the characters a-z, 0-9, _ and -'
        //     ),
        email: yup
            .string()
            .email('Bitte gib eine gültige E-Mail-Adresse ein')
            .required('Bitte gib eine E-Mail-Adresse ein'),
        currentPassword: yup.string(),
        password: yup.string().min(6, 'Das Passwort muss mindestens 6 Zeichen haben'),
        passwordAgain: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Die Passwörter stimmen nicht überein')
    });

    const settings = user.settings || {};

    const initialValues = {
        enableGravatar: !!user.enableGravatar,
        emailUpdates,
        email: user.email,
        currentPassword: '',
        password: '',
        passwordAgain: '',
        actionWindows: user.promptedActionWindows || defaultActionWindows,
        chooseOrder: !!settings.keywordSettings.chooseOrder,
        chooseCards: !!settings.keywordSettings.chooseCards,
        promptDupes: !!settings.promptDupes,
        hideInterrupts: settings.hideInterrupts ?? true,
        hideReactions: settings.hideReactions ?? true,
        keyboardShortcuts: keyboardShortcutsEnabled(settings),
        cardSize: settings.cardSize || 'normal'
    };

    return (
        <Page>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={async (values) => {
                    try {
                        const ret = await saveProfile({
                            username: user.username,
                            profile: {
                                email: values.email,
                                currentPassword: values.currentPassword,
                                password: values.password,
                                promptedActionWindows: values.actionWindows,
                                enableGravatar: values.enableGravatar,
                                // Only sent when changed here, so saving a page loaded before
                                // unsubscribing from an email doesn't turn emails back on
                                emailUpdates:
                                    values.emailUpdates !== emailUpdates
                                        ? values.emailUpdates
                                        : undefined,
                                settings: {
                                    promptDupes: values.promptDupes,
                                    hideInterrupts: values.hideInterrupts,
                                    hideReactions: values.hideReactions,
                                    keyboardShortcuts: values.keyboardShortcuts,
                                    keywordSettings: {
                                        chooseOrder: values.chooseOrder,
                                        chooseCards: values.chooseCards
                                    },
                                    background: selectedBackground,
                                    cardSize: values.cardSize
                                }
                            }
                        }).unwrap();
                        toast.success('Einstellungen gespeichert.');

                        dispatch(setUser(ret.data?.user ?? ret.user));
                        if (ret.data?.token && ret.data?.refreshToken) {
                            dispatch(setAuthTokens(ret.data.token, ret.data.refreshToken));
                        }
                    } catch (err) {
                        toast.error(
                            err.data?.message ||
                                err.message ||
                                'Die Einstellungen konnten nicht gespeichert werden. Bitte versuche es später noch einmal.'
                        );
                    }
                }}
            >
                {(formProps) => (
                    <form onSubmit={formProps.handleSubmit} className='flex flex-col gap-2'>
                        <GameSettings formProps={formProps} />
                        <CardSizeSettings user={user} formProps={formProps} />
                        <Panel title='Hintergrund des Spieltischs'>
                            <div className='grid sm:grid-cols-3 gap-2'>
                                {backgrounds.map((background) => (
                                    <GameBackgroundOption
                                        imageUrl={background.imageUrl}
                                        key={background.name}
                                        label={background.label}
                                        name={background.name}
                                        onSelect={(background) => setSelectedBackground(background)}
                                        selected={selectedBackground === background.name}
                                    />
                                ))}
                            </div>
                        </Panel>
                        <ActionWindowOptions formProps={formProps} />
                        <ProfileMain user={user} formProps={formProps} />
                        <div className='w-full sticky bottom-6 z-50 mt-2 flex justify-center'>
                            <Button
                                className='w-1/2'
                                color='success'
                                type='submit'
                                isLoading={isSaveLoading}
                            >
                                Einstellungen speichern
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Page>
    );
};

export default Profile;
