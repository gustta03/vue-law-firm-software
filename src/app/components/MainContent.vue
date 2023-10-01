<script setup lang="ts">
const contentType = defineProps({
  pageTitle: String
})
</script>

<template>
  <div class="main-workspace-content">
    <div class="header-buttons">
      <h2>{{ contentType.pageTitle }}</h2>
    </div>

    <slot></slot>
  </div>
</template>

<style>
.main-workspace-content {
  margin: 0 auto;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  height: 90vh;
  margin-top: 20px;
  width: 95%;
}

h2 {
  width: 15rem;
}

.header-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-buttons > button {
  margin-right: 20px;
  height: 40px;
  border-radius: 5px;
  background-color: #228BE6;
  width: 10rem;
}
</style>
