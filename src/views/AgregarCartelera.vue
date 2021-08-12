<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="agregarCartelera(cartelera)">
            <div class="form-group">
                <label for="date">Fecha</label>
                <input type="text" v-model="cartelera.date" class="form-control mb-2" placeholder="Ingresa fecha (DD/MM/AAAA)" id="date">
            </div>
            <div class="form-group">
                <label for="pais">Pais</label>
                <input type="text" v-model="cartelera.country" class="form-control mb-2" placeholder="Ingresa pais" id="pais">
            </div>
            <div class="form-group">
                 <label for="ciudad">Ciudad</label>
                 <input type="text" v-model="cartelera.city" class="form-control mb-2" placeholder="Ingresa ciudad" id="ciudad">
            </div>
            <div class="form-group">
                 <label for="estado">Estado</label>
                 <input type="text" v-model="cartelera.state" class="form-control mb-2" placeholder="Ingresa estado" id="estado">
            </div>
            <div class="form-group">
                 <label for="comision">Comision</label>
                 <input type="text" v-model="cartelera.commission" class="form-control mb-2" placeholder="Ingresa comision" id="comision">
            </div>
            <div class="form-group">
                 <label for="promotor">Promotor</label>
                 <input type="text" v-model="cartelera.promoter" class="form-control mb-2" placeholder="Ingresa promotor" id="promotor">
            </div>
             <div class="form-group">
                  <label for="lugar">Lugar</label>
                  <input type="text" v-model="cartelera.place" class="form-control mb-2" placeholder="Ingresa lugar" id="lugar">
             </div>
             
            <input type="hidden" v-model="cartelera.uid">
            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
        {{cartelera}}
        {{usuario}}
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
    name: 'AgregarCartelera',
    data() {
        return {
            cartelera:{
                date: '',
                country:'',
                city:'',
                state:'',
                commission:'',
                promoter:'',
                place: '',
                uid:''
            }
        }
    },
    methods:{
        ...mapActions(['agregarCartelera'])
    },
    computed:{
        ...mapState(['usuario'])
    },
    created(){
        this.cartelera.uid  = this.usuario.uid
    }

}
</script>