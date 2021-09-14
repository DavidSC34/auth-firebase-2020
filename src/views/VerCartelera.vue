<template>
  <div class="mt-5">
<!-- {{usuario}} -->
    <h1 class="mb-4">Peleas en la cartelera</h1>
     <router-link :to="{name:'AgregarPelea', params: {id_cartelera:id}}" >
            <button class='btn btn-primary mb-2' :disabled="bloquearBoton">Agregar</button>
            <!-- <button class='btn btn-primary mb-2' >Agregar</button> -->
    </router-link>
   

    <div class="table-responsive-sm" v-if="peleas.length > 0">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <!-- <th scope="col">#</th> -->
                    <th scope="col">Champion</th>
                    <th scope="col">Country</th>
                    <th scope="col">Result</th>
                    <th scope="col">Rounds</th>
                    <th scope="col">Division</th>
                    <th scope="col">Title</th>
                    <th scope="col">Challenger</th>
                    <th scope="col">Country</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in peleas" :key="index" >
                    <!-- <td>{{item.id}}</td> -->
                    <td>{{item.champion}}</td>
                    <td>{{item.country_champion}}</td>
                    <td>{{item.result}}</td>
                    <td>{{item.rounds}}</td>
                    <td>{{item.division}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.challenger}}</td>
                    <td>{{item.country_challenger}}</td>
                    <td>
                        
                        <router-link :to="{name:'EditarPelea', params: {id: item.id}}"  class="float-right ml-2" v-if="item.uid == usuario.uid">
                           
                            <i class="bi-pencil-square" style="color: cornflowerblue;"></i>
                        </router-link>
                        <!-- <button class='btn btn-danger float-right' @click="eliminarCartelera(item)">Eliminar</button> -->
                         <i class="bi-trash float-right" style="color: cornflowerblue;" @click="eliminarPelea(item)" v-if="item.uid == usuario.uid"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <p class="text-center">No hay peleas registradas</p>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
    name:'VerCartelera',
    data() {
        return {
            id: this.$route.params.id,           
            
        }
    },
    created(){
        this.getCartelera(this.id);
        this.getPeleasCartelera(this.id);
    },
    methods:{
      ...mapActions(['getPeleasCartelera','eliminarPelea','getCartelera'])
    },   
    computed:{
        ...mapState(['peleas','usuario','cartelera']),
        bloquearBoton(){
            if(this.cartelera.uid !== this.usuario.uid){
                return true;
            }
        }
        
    }

    
}
</script>