export const LeftMenu = [
    { path: '/decks', title: 'Decks', showOnlyWhenLoggedIn: true },
    { path: '/play', title: 'Spielen' },
    {
        title: 'Hilfe',
        childItems: [
            { path: '/how-to-play', title: 'Spielanleitung' },
            { path: '/about', title: 'Über' },
            { path: '/privacy', title: 'Datenschutz' }
        ]
    },
    {
        title: 'Admin',
        showOnlyWhenLoggedIn: true,
        childItems: [
            { path: '/news', title: 'News', permission: 'canEditNews' },
            { path: '/users', title: 'Users', permission: 'canManageUsers' },
            { path: '/nodes', title: 'Nodes', permission: 'canManageNodes' },
            {
                path: '/admin/problem-reports',
                title: 'Problem Reports',
                permission: 'canManageProblemReports'
            },
            { path: '/admin/motd', title: 'Motd', permission: 'canManageMotd' },
            { path: '/banlist', title: 'Ban List', permission: 'canManageBanlist' },
            { path: '/events', title: 'Events', permission: 'canManageEvents' }
        ]
    }
];

export const RightMenu = [
    { path: '/login', title: 'Anmelden', showOnlyWhenLoggedOut: true },
    { path: '/register', title: 'Registrieren', showOnlyWhenLoggedOut: true }
];

export const ProfileMenu = [
    { title: 'Profil & Einstellungen', path: '/profile' },
    { title: 'Statistiken', path: '/stats' },
    { title: 'Sicherheit', path: '/security' },
    { title: 'Blockierte Spieler', path: '/blocklist' },
    { title: 'Abmelden', path: '/logout' }
];
