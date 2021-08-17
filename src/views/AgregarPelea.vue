<template>
    <div class="mt-5">
        <h1>Agregar Pelea</h1>
        <form @submit.prevent="agregarPelea(pelea)" class="mt-5">
            <div class="form-group">
                <label for="champion">Champion</label>
                <input type="text" v-model="pelea.champion" class="form-control mb-2" placeholder="Ingresa campeon" id="champion">
            </div>
            <div class="form-group">
                <label for="country_champion">Pais</label>
                <input type="text" v-model="pelea.country_champion" class="form-control mb-2" placeholder="Ingresa pais" id="country_champion">
            </div>
            <div class="form-group">
                 <label for="result">Resultado</label>
                 <input type="text" v-model="pelea.result" class="form-control mb-2" placeholder="Ingresa resultado" id="result">
            </div>
            <div class="form-group">
                 <label for="rounds">Rounds</label>
                 <input type="number" v-model="pelea.rounds" class="form-control mb-2" placeholder="Ingresa rounds" id="rounds">
            </div>
            <div class="form-group">
                 <label for="division">Division</label>
                 <input type="text" v-model="pelea.division" class="form-control mb-2" placeholder="Ingresa division" id="division">
            </div>
            <div class="form-group">
                 <label for="title">Titulo</label>
                 <input type="text" v-model="pelea.title" class="form-control mb-2" placeholder="Ingresa titulo" id="title">
            </div>
             <div class="form-group">
                  <label for="challenger">Retador</label>
                  <input type="text" v-model="pelea.challenger" class="form-control mb-2" placeholder="Ingresa retador" id="challenger">
             </div>
             <div class="form-group">
                  <label for="country_challenger">Pais retador</label>
                  <input type="text" v-model="pelea.country_challenger" class="form-control mb-2" placeholder="Ingresa pais" id="country_challenger">
             </div>
             
            <input type="hidden" v-model="pelea.uid">
            <button type="submit" class="btn btn-primary" :disabled="bloquear">Agregar</button>
        </form>
        {{pelea}}
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AgregarCartelera',
    data() {
        return {
            pelea:{
                champion: '',
                country_champion:'',
                result:'',
                rounds:'',
                division:'',
                title:'',
                challenger: '',
                country_challenger:'',
                uid:''
            }
        }
    },
    methods:{
        ...mapActions(['agregarPelea'])
    },
    computed:{
        ...mapState(['usuario']),
        bloquear(){
            if(this.pelea.rounds <= 0 || this.pelea.rounds > 12){
                return true;
            }
        }
    },
    created(){
        this.pelea.uid  = this.usuario.uid
    }
    

}
</script>
