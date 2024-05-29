export default [
    { id: 'home', name: 'Главная', path: '/', isExact: true, isAuthed: false },
    {
        id: 'news',
        name: 'Новости',
        path: '/news',
        isExact: false,
        isAuthed: false,
    },
    {
        id: 'events',
        path: '/events',
        name: 'События',
        isExact: true,
        isAuthed: false,
    },
    {
        id: 'profile',
        name: 'Профиль',
        path: '/profile',
        isExact: false,
        isAuthed: true,
    },
];
