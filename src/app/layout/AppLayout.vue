<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const hideSideBar = computed(() => {
  return route.meta.hideSideBar !== false
})

</script>

<template>
  <div class="layout-container">
    <div class="sidebar-container" v-if="hideSideBar">
      <ul>
        <li>
          <router-link to="/">
            <i class="pi pi-desktop" style="color: #708090"></i> 
            <span>Area de trabalho</span>
          </router-link>
        </li>
        <li>
          <router-link to="/documents">
            <i class="pi pi-file" style="color: #708090"></i> 
            <span>Documentos</span>
          </router-link>
        </li>
        <li>
          <router-link to="/customer">
            <i class="pi pi-users" style="color: #708090"></i> 
            <span>Clientes</span>
          </router-link>
        </li>
        <li>
          <router-link to="/cases">
            <i class="pi pi-folder" style="color: #708090"></i> 
            <span>Processos e casos</span>
          </router-link>
        </li>
        <li>
          <router-link to="/signup">
            <i class="pi pi-user" style="color: #708090"></i> 
            <span>Adicionar advogado</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>
 
<style>

.layout-container {
  height: 100vh;
  display: flex;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #f1f1f1;
  border-left: 1px solid #DFE7EF;
  padding: 0;
  margin: 0;
  top: 0;
}

.main-content {
  display: flex;
  width: 100%;
  background-color: #ffffff;
}

a {
  text-decoration: none;
  color: #708090
}

.sidebar-container {
  display: flex;
  text-align: start;
  width: 20rem;
}

ul {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

li {
  margin-bottom: 5px;
  padding: 5px;
  width: 12rem;
  justify-content: space-between;
  display: flex; 
  cursor: pointer;
}

li:hover {
  background-color: azure;
}

i {
  margin-right: 6px;
  border: 1px solid #DFE7EF;
  border-radius: 4px;
  padding: 10px;
}

</style>
