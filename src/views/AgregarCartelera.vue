<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="agregarCartelera(cartelera)">
            <input type="text" v-model="cartelera.date" class="form-control mb-2" placeholder="Ingresa fecha (DD/MM/AAAA)">
            <input type="text" v-model="cartelera.country" class="form-control mb-2" placeholder="Ingresa pais">
            <input type="text" v-model="cartelera.city" class="form-control mb-2" placeholder="Ingresa ciudad">
            <input type="text" v-model="cartelera.state" class="form-control mb-2" placeholder="Ingresa estado">
            <input type="text" v-model="cartelera.commission" class="form-control mb-2" placeholder="Ingresa comision">
            <input type="text" v-model="cartelera.promoter" class="form-control mb-2" placeholder="Ingresa promotor">
            <input type="text" v-model="cartelera.place" class="form-control mb-2" placeholder="Ingresa lugar">
            <input type="hidden" v-model="cartelera.uid" >
            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
        {{cartelera}}
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
                uid:'fghdfghdfghdfghdfgh'
            }
        }
    },
    methods:{
        ...mapActions(['agregarCartelera'])
    },
    computed:{
        ...mapState(['usuario'])
    }
}
</script>