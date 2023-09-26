<script setup lang="ts">
import { makeRemoteAddAccount } from '../../main/factories/usecases/load-customer-factory'
import { onMounted, ref } from 'vue'

// Define the type for CustomerResultModel to match the expected structure
type CustomerResultModel = {
  name: string
  phone: string
  email: string
  address: string
  cpfCnpj: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  profession: string
  nationality: string
  observations: string
  documents: any[]
}

const addAccount = makeRemoteAddAccount()

const data = ref<CustomerResultModel[]>([])

onMounted(() => {
  addAccount.load().then((res) => {
    data.value = res as unknown as CustomerResultModel[]
  })
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
