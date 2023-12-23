import ObservationsPage from "../pages/ObservationsPage.vue";

export default [
    {
        name: 'observations',
        path: '/',
        component: ObservationsPage,
    }, {
        name: 'cats',
        path: '/cats',
        component: () => import('../pages/CatsPage.vue'),
    },
]