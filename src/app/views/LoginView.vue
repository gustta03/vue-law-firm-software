<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { makeRemoteAddAccount } from '../../main/factories/usecases/load-customer-factory'
import { onMounted, ref } from 'vue'
const addAccout = makeRemoteAddAccount()

const data = ref()

onMounted(() => {
  const apidata = (data.value = addAccout.load().then((response) => response))
  console.log(apidata)
})
</script>

<template>
  <main>
    <div v-for="prop in data" :key="prop.gender">
      {{ prop.name }}
    </div>
  </main>
</template>
../app/components/TheWelcome.vue
