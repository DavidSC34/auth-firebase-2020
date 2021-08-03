import Vue from 'vue';
import Vuex from 'vuex';
import { auth, db } from '../firebase';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: null,
        error: null,
        tareas: [],
        tarea: { nombre: '', id: '' },
        cartelera:{},
        carteleras:[],
        pelea:{},
        peleas:{}
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setTareas(state, payload) {
            state.tareas = payload
        },
        setCarteleras(state,payload){
        state.carteleras = payload;
        },
        setTarea(state, payload) {
            state.tarea = payload
        },
        setEliminarTarea(state, payload) {
            state.tareas = state.tareas.filter(item => item.id !== payload)
        }
    },
    actions: {
        eliminarTarea({ commit, state }, id) {
            db.collection(state.usuario.email).doc(id).delete()
                .then(() => {
                    commit('setEliminarTarea', id)
                })
                .catch(error => console.log(error))
        },
        agregarTarea({ commit, state }, nombreTarea) {
            db.collection(state.usuario.email).add({
                    nombre: nombreTarea
                })
                .then(doc => {
                    router.push('/')
                })
                .catch(error => console.log(error))
        },
        getTarea({ commit, state }, id) {
            db.collection(state.usuario.email).doc(id).get()
                .then(doc => {
                    // console.log(doc.data())
                    // console.log(doc.id)
                    let tarea = doc.data()
                    tarea.id = doc.id
                    commit('setTarea', tarea)
                })
        },
        editarTarea({ commit, state }, tarea) {
            db.collection(state.usuario.email).doc(tarea.id).update({
                    nombre: tarea.nombre
                })
                .then(() => {
                    router.push({ name: 'Inicio' })
                })
        },
        getTareas({ commit, state }) {
            const tareas = [];
            db.collection(state.usuario.email).get()
                .then(res => {
                    res.forEach(doc => {
                        let tarea = doc.data();
                        tarea.id = doc.id;
                        tareas.push(tarea);
                    })
                    commit('setTareas', tareas);
                })
                .catch(error => console.log(error))
        },
        async getCarteleras({ commit, state }){
            const carteleras = [];
            try{
            const res = await fetch('http://localhost:3000/carteleras');
            const dataDB = await res.json();
            console.log(dataDB);
            commit('setCarteleras', dataDB.detalle);
            }catch(error){
                console.log(error);
            }
        },
        async editarCartelera({commit},cartelera){
           try {
               const res = await fetch(`http://localhost:3000/carteleras/${cartelera.id}`,{
                   method:'PUT',
                   body:JSON.stringify(cartelera)
               });
               const dataDB = res.json();
               console.log(dataDB);

           } catch (error) {
               console.log(error);
           }
        },
        async getCartelera({commit}, id){
            try {
                const res = await fetch(`http://localhost:3000/carteleras/${id}`);
                const dataDB = res.json();
                console.log(dataDB);
                   
            } catch (error) {
                console.log(error);
            }  
        },
        crearUsuario({ commit }, usuario) {

            auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
                .then(res => {
                    console.log(res);
                    const usuarioCreado = {
                        email: res.user.email,
                        uid: res.user.uid
                    }

                    //Para asignar sus base de tareas al usuario
                    db.collection(res.user.email).add({
                        nombre: 'Tarea ejemplo'
                    }).then(doc => {

                        commit('setUsuario', usuarioCreado);
                        router.push('/')

                    }).catch(error => console.log(error))


                })
                .catch(error => {

                    commit('setError', error)
                })
        },
        ingresoUsuario({ commit }, usuario) {
            auth.signInWithEmailAndPassword(usuario.email, usuario.password)
                .then(res => {
                    console.log(res);
                    const usuarioLogeado = {
                        email: res.user.email,
                        uid: res.user.uid
                    };
                    commit('setUsuario', usuarioLogeado);
                    router.push('/');
                })
                .catch(error => {
                    console.log(error);
                    commit('setError', error)
                })


        },
        cerrarSesion({ commit }) {
            auth.signOut()
                .then(() => {
                    router.push('/acceso')
                })
        },
        detectarUsuario({ commit }, usuario) {
            commit('setUsuario', usuario)
        }
    },
    getters: {
        existeUsuario(state) {
            if (state.usuario === null) {
                return false;
            } else {
                return true;
            }
        }
    },
    modules: {}
})