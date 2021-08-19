<template>
<div class="mt-2">
{{usuario}}
    <h1>Carteleras</h1>
   
        <router-link to='/agregarCartelera'>
            <button class='btn btn-primary mb-2'>Agregar</button>
        </router-link>
  

    <div class="table-responsive-sm" v-if="carteleras.length >0">
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
                        <router-link :to="{name:'VerCartelera', params: {id: item.id_cartelera}}"><i class="bi-card-list" style="color: cornflowerblue;"></i></router-link>
                        <router-link :to="{name:'EditarCartelera', params: {id: item.id_cartelera}}"  class="float-right ml-2"  v-if="item.uid == usuario.uid ">
                            <!-- <button class="btn btn-warning">Editar</button> -->
                            <i class="bi-pencil-square" style="color: cornflowerblue;"></i>
                        </router-link>
                        <!-- <button class='btn btn-danger float-right' @click="eliminarCartelera(item)">Eliminar</button> -->
                         <i class="bi-trash float-right" style="color: cornflowerblue;" @click="eliminarCartelera(item)" v-if="item.uid == usuario.uid "></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <p>No hay carteleras registradas</p>
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