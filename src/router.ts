import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/home';
import DetalheTarefa from './pages/DetalheTarefa';
import NotFound from './pages/NotFound';

Vue.use(VueRouter);

export default new VueRouter({ // navegar entre páginas
    mode: 'history',
    routes: [{
        path: '/',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/detalhe',
        component: DetalheTarefa,
        name: 'detalhe',
        props: true,
        meta: {
            title: 'Detalhe'
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: '404'
        }
    }
    ]
});