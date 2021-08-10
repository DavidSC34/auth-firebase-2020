import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'


Vue.use(VueRouter)

const routes = [

    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ( /* webpackChunkName: "registro" */ '../views/Registro.vue')
    },
    {
        path: '/',
        name: 'Inicio',
        component: () =>
            import ( /* webpackChunkName: "inicio" */ '../views/Inicio.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/acceso',
        name: 'Acceso',
        component: () =>
            import ( /* webpackChunkName: "Acceso" */ '../views/Acceso.vue')
    },
    {
        path: '/editar/:id',
        name: 'Editar',
        component: () =>
            import ( /* webpackChunkName: "Editar" */ '../views/Editar.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/agregar',
        name: 'Agregar',
        component: () =>
            import ( /* webpackChunkName: "Agregar" */ '../views/Agregar.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/agregarCartelera',
        name: 'AgregarCartelera',
        component: () =>
            import ( /* webpackChunkName: "Agregar" */ '../views/AgregarCartelera.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/editarCartelera',
        name: 'EditarCartelera',
        component: () =>
            import ( /* webpackChunkName: "Agregar" */ '../views/EditarCartelera.vue'),
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        const usuario = auth.currentUser;
        console.log(usuario);

        if (!usuario) {

            next({ path: '/acceso' });
        } else {

            next();
        }
    } else {
        next(); //->llevalo a esa ruta
    }
})

export default router