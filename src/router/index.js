import Vue from 'vue'
import VueRouter from 'vue-router'


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
            import ( /* webpackChunkName: "inicio" */ '../views/Inicio.vue')
    },
    {
        path: '/Acceso',
        name: 'Acceso',
        component: () =>
            import ( /* webpackChunkName: "Acceso" */ '../views/Acceso.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router