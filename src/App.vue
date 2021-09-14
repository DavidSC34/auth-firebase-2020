<template>
  <div id='app' class="container mt-2">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                  <router-link to="/" v-if="existeUsuario" class="nav-link  ">Carteleras</router-link>
                </li>
                <li class="nav-item">
                  <!-- <a class="nav-link" href="#">Mis Carteleras</a> -->
                  <router-link to="/miscasteleras" v-if="existeUsuario" class="nav-link">Mis Carteleras</router-link>
                </li>
                <li class="nav-item">
                  <!-- <a class="nav-link" href="#">Pricing</a> -->
                  <router-link to="/registro" v-if="!existeUsuario" class="nav-link">Registro</router-link>
                </li>
                <li class="nav-item">
                  <!-- <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> -->
                   <router-link to="/acceso" v-if="!existeUsuario" class="nav-link">Acceso</router-link>
                </li>
                 <li class="nav-item">
                  <!-- <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> -->
                   <button @click="cerrarSesion" v-if="existeUsuario" class="btn btn-success" type="button">Cerrar sesion</button>
                </li>
              </ul>
            </div>
      </nav>
          <!-- <div >
            <router-link to="/" v-if="existeUsuario" class="btn btn-dark mr-2">Carteleras</router-link>
            <router-link to="/miscasteleras" v-if="existeUsuario" class="btn btn-dark mr-2">Mis Carteleras</router-link>
            <router-link to="/registro" v-if="!existeUsuario" class="btn btn-dark mr-2">Registro</router-link>
            <router-link to="/acceso" v-if="!existeUsuario" class="btn btn-dark mr-2">Acceso</router-link>
            <button @click="cerrarSesion" v-if="existeUsuario" class="btn btn-dark mr-2">Cerrar sesion</button>
          </div> -->
    <router-view/>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  methods:{
      ...mapActions(['cerrarSesion'])
  }, computed: {
    
      ...mapGetters(['existeUsuario'])
    
  },
}
</script>
