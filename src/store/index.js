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
        cartelera: {
            id: '',
            date: '',
            country: '',
            city: '',
            state: '',
            commission: '',
            promoter: '',
            place: '',
            uid: ''
        },
        carteleras: [],
        pelea: {
            id: '',
            id_cartelera: '',
            champion: '',
            country_champion: '',
            result: '',
            challenger: '',
            country_challenger: '',
            gender: '',
            organismo: '',
            division: '',
            title: '',
            rounds: '',
            uid: ''
        },
        peleas: []
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setTareas(state, payload) {
            state.tareas = payload;
        },
        setTarea(state, payload) {
            state.tarea = payload;
        },
        setEliminarTarea(state, payload) {
            state.tareas = state.tareas.filter(item => item.id !== payload)
        },
        setCarteleras(state, payload) {
            state.carteleras = payload;
        },
        setCartelera(state, payload) {
            state.cartelera = payload;
        },
        setPeleas(state, payload) {
            state.peleas = payload;
        },
        setPelea(state, payload) {
            state.pelea = payload;
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
        async agregarCartelera({ commit, state }, cartelera) {
            console.log(cartelera);
            // let carteleraData = {
            //     usuarioLogeado:state.usuario,
            //     cartelera:cartelera
            // }
            // console.log(carteleraData);
            try {
                const res = await fetch('http://localhost:3000/carteleras', {
                    method: 'POST',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(cartelera),

                });

                const dataDB = await res.json();
                console.log(dataDB);
                if (dataDB.status == 200) {
                    router.push('/')
                }

            } catch (error) {
                console.log(error);
            }
        },
        async getCarteleras({ commit }) {
            let carteleras = [];
            try {
                const res = await fetch('http://localhost:3000/carteleras');
                const dataDB = await res.json();
                // console.log(typeof dataDB.detalle);
                if (dataDB.status == 200 && dataDB.total_registros > 0) {
                    carteleras = dataDB.detalle;
                    commit('setCarteleras', dataDB.detalle);
                } else if (dataDB.status == 200 && dataDB.total_registros == 0) {
                    commit('setCarteleras', carteleras);

                } else {
                    alert(dataDB.detalle)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async editarCartelera({ commit, state }, cartelera) {
            let carteleraData = {
                usuarioLogeado: state.usuario,
                cartelera: cartelera
            }
            console.log(carteleraData);
            try {
                const res = await fetch(`http://localhost:3000/carteleras/${cartelera.id}`, {
                    method: 'PUT',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(carteleraData)
                });
                const resDB = await res.json();
                // console.log(resDB);
                if (resDB.status == 200) {
                    router.push('/');
                } else {
                    alert(resDB.detalle);
                }

            } catch (error) {
                console.log(error);
            }
        },
        async getCartelera({ commit }, id) {
            try {
                console.log(id);
                const res = await fetch(`http://localhost:3000/carteleras/${id}`);
                const dataDB = await res.json();
                console.log(dataDB.detalle[0]);
                let cartelera = {
                    id: dataDB.detalle[0].id_cartelera,
                    date: dataDB.detalle[0].date,
                    country: dataDB.detalle[0].country,
                    city: dataDB.detalle[0].city,
                    state: dataDB.detalle[0].state,
                    commission: dataDB.detalle[0].commission,
                    promoter: dataDB.detalle[0].promoter,
                    place: dataDB.detalle[0].place,
                    uid: dataDB.detalle[0].uid
                }

                commit('setCartelera', cartelera);

            } catch (error) {
                console.log(error);
            }
        },
        async eliminarCartelera({ commit, state }, cartelera) {
            let carteleraData = {
                usuarioLogeado: state.usuario,
                cartelera: cartelera
            }
            try {
                const res = await fetch(`http://localhost:3000/carteleras/${cartelera.id_cartelera}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(carteleraData)
                });
                const resDB = await res.json();
                console.log(resDB);
                if (resDB.status == 200) {
                    this.state.carteleras = this.state.carteleras.filter(item => item.id_cartelera !== cartelera.id_cartelera)
                } else {
                    alert(resDB.detalle);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getPeleasCartelera({ commit }, id) {
            let peleas = [];
            try {
                const res = await fetch(`http://localhost:3000/pelea-cartelera/${id}`);
                const dataDB = await res.json();
                console.log(dataDB);
                if (dataDB.status == 200 && dataDB.total_registros > 0) {
                    peleas = dataDB.detalle;
                    commit('setPeleas', peleas);
                } else if (dataDB.status == 200 && dataDB.total_registros == 0) {
                    commit('setPeleas', peleas);
                } else {
                    alert(dataDB.detalle);

                }
            } catch (error) {
                console.log(error);
            }
        },
        async agregarPelea({ commit }, pelea) {
            console.log(pelea);
            try {
                const res = await fetch('http://localhost:3000/peleas', {
                    method: 'POST',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(pelea),

                });

                const dataDB = await res.json();
                console.log(dataDB);
                if (dataDB.status == 200) {
                    router.push(`/verCartelera/${pelea.id_cartelera}`)
                } else {
                    alert(dataDB.detalle);
                }

            } catch (error) {
                console.log(error);
            }
        },
        async getPelea({ commit }, id) {
            try {
                console.log(id);
                const res = await fetch(`http://localhost:3000/peleas/${id}`);
                const peleaDB = await res.json();
                console.log(peleaDB.detalle[0]);
                let pelea = {
                    id: peleaDB.detalle[0].id,
                    id_cartelera: peleaDB.detalle[0].id_cartelera,
                    champion: peleaDB.detalle[0].champion,
                    country_champion: peleaDB.detalle[0].country_champion,
                    result: peleaDB.detalle[0].result,
                    challenger: peleaDB.detalle[0].challenger,
                    country_challenger: peleaDB.detalle[0].country_challenger,
                    gender: peleaDB.detalle[0].gender,
                    organismo: peleaDB.detalle[0].organismo,
                    division: peleaDB.detalle[0].division,
                    title: peleaDB.detalle[0].title,
                    rounds: peleaDB.detalle[0].rounds,
                    uid: peleaDB.detalle[0].uid
                }
                if (res.status == 200) {

                    commit('setPelea', pelea);
                } else {
                    alert(peleaDB.detalle[0])
                }

            } catch (error) {
                console.log(error);
            }
        },
        async editarPelea({ commit }, pelea) {
            console.log(pelea);
            try {
                const res = await fetch(`http://localhost:3000/peleas/${pelea.id}`, {
                    method: 'PUT',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(pelea)
                });
                const resDB = await res.json();
                // console.log(resDB);
                if (resDB.status == 200) {
                    router.push(`/verCartelera/${pelea.id_cartelera}`)
                } else {
                    alert(resDB.detalle);
                }

            } catch (error) {
                console.log(error);
            }
        },
        async eliminarPelea({ commit }, pelea) {
            console.log(pelea);
            try {
                const res = await fetch(`http://localhost:3000/peleas/${pelea.id}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: JSON.stringify(pelea)
                });
                const resDB = await res.json();
                console.log(resDB);
                if (resDB.status == 200) {
                    this.state.peleas = this.state.peleas.filter(item => item.id !== pelea.id)
                } else {
                    alert(resDB.detalle);
                }
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