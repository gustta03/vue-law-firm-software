<script setup lang="ts">
 import AppLayout from '../app/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
  top: 0;
  background-color: #ff0000;
}

</style>
