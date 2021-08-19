<template>
<div class="mt-2">

    <h1>Carteleras</h1>
   
        <router-link to='/agregarCartelera'>
            <button class='btn btn-primary mb-2'>Agregar</button>
        </router-link>
    <!-- <ul class="list-group">
        <li v-for="(item,index) in tareas" :key="index" class="list-group-item">
            {{item.id}} - {{item.nombre}}
            <router-link :to="{name: 'Editar', params: {id: item.id}}" class="float-right ml-2">
                    <button class='btn btn-warning'>Editar</button>
            </router-link>
             <button @click="eliminarTarea(item.id)" class='btn btn-danger float-right'>Eliminar</button>
        </li>
    </ul> -->

    <!-- <ul class="list-group">
        <li v-for="(item,index) in carteleras" :key="index" class="list-group-item">
                {{item.id_cartelera}} - {{item.date}} -  {{item.place}}
                <router-link :to="{name:'EditarCartelera', params: {id: item.id}}"  class="float-right ml-2">
                      <button class="btn btn-warning">Editar</button>
                </router-link>
                <button class='btn btn-danger float-right'>Eliminar</button>
        </li>
    </ul> -->

    <div class="table-responsive-sm">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Country</th>
                    <th scope="col">City</th>
                    <th scope="col">Commision</th>
                    <th scope="col">Promoter</th>
                    <th scope="col">Place</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in carteleras" :key="index" >
                    <td>{{item.id_cartelera}}</td>
                    <td>{{item.date}}</td>
                    <td>{{item.country}}</td>
                    <td>{{item.city}}</td>
                    <td>{{item.commission}}</td>
                    <td>{{item.promoter}}</td>
                    <td>{{item.place}}</td>
                    <td>
                        <router-link :to="{name:'VerCartelera', params: {id: item.id_cartelera}}"><i class="bi-card-list"></i></router-link>
                        <router-link :to="{name:'EditarCartelera', params: {id: item.id_cartelera}}"  class="float-right ml-2">
                            <!-- <button class="btn btn-warning">Editar</button> -->
                            <i class="bi-file-text"></i>
                        </router-link>
                        <!-- <button class='btn btn-danger float-right' @click="eliminarCartelera(item)">Eliminar</button> -->
                         <i class="bi-trash float-right" @click="eliminarCartelera(item)" v-if="item.uid == usuario.uid "></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    name:'Inicio',
    computed: {
       ...mapState(['usuario','carteleras'])
    },
    methods:{
        ...mapActions(['getCarteleras','eliminarCartelera'])
    },
    created(){
       
        this.getCarteleras();
    }
    

}
</script>