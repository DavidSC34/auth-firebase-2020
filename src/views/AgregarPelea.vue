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
                  <label for="challenger">Retador</label>
                  <input type="text" v-model="pelea.challenger" class="form-control mb-2" placeholder="Ingresa retador" id="challenger">
             </div>
             <div class="form-group">
                  <label for="country_challenger">Pais retador</label>
                  <input type="text" v-model="pelea.country_challenger" class="form-control mb-2" placeholder="Ingresa pais" id="country_challenger">
             </div>
            <div class="form-group">
                 <label for="gender">Genero</label>
                 <input type="text" v-model="pelea.gender" class="form-control mb-2" placeholder="Ingresa titulo" id="gender">
            </div>
            <div class="form-group">
                 <label for="organismo">Organismo</label>
                 <input type="text" v-model="pelea.organismo" class="form-control mb-2" placeholder="Ingresa titulo" id="organismo">
            </div>
            
            <div class="form-group">
                 <label for="division">Division</label>
                 <!-- <input type="text" v-model="pelea.division" class="form-control mb-2" placeholder="Ingresa division" id="division"> -->
                 <select class="form-control mb-2" id="division" v-model="pelea.division">
                     <option value="" disabled>-- SELECCIONA DIVISION --</option>
                    <option value="HEAVY">HEAVY</option>
                    <option value="BRIDGERWEIGHT">BRIDGERWEIGHT</option>
                    <option value="CRUISER">CRUISER</option>
                    <option value="LIGHTHEAVY">LIGHTHEAVY</option>
                    <option value="SUPERMIDDLE">SUPERMIDDLE</option>
                    <option value="MIDDLE">MIDDLE</option>
                    <option value="SUPERWELTER">SUPERWELTER</option>
                    <option value="WELTER">WELTER</option>
                    <option value="SUPERLIGHT">SUPERLIGHT</option>
                    <option value="LIGHT">LIGHT</option>
                    <option value="">SUPERFEATHER</option>
                    <option>FEATHER</option>
                    <option>SUPERBANTAM</option>
                    <option>BANTAM</option>
                    <option>SUPERFLY</option>
                    <option>FLY</option>
                    <option>LIGHTFLY</option>
                    <option>STRAW</option>
                    <option>ATOM</option>
                </select>
            </div>
            <div class="form-group">
                 <label for="title">Titulo</label>
                 <input type="text" v-model="pelea.title" class="form-control mb-2" placeholder="Ingresa titulo" id="title">
            </div>
            <div class="form-group">
                 <label for="rounds">Rounds</label>
                 <input type="number" v-model="pelea.rounds" class="form-control mb-2" placeholder="Ingresa rounds" id="rounds">
            </div>
            
             
             
            <input type="hidden" v-model="pelea.uid">
            <input type="hidden" v-model="pelea.id_cartelera">
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
                gender:'',
                organismo:'',
                challenger: '',
                country_challenger:'',
                uid:'',
                id_cartelera:this.$route.params.id_cartelera,
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
