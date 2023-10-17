<script setup lang="ts">
import { makeCacheStorage } from '../../../main/factories/cache/local-storage-factory'
import { ref } from 'vue'
import router from '../../router/index'
import { dependencies } from '../../dep'

const { signup } = dependencies
const cache = makeCacheStorage()

const data = ref('')
const name = ref('')
const email = ref('')
const password = ref('')

function setValuesOnSubmitUser(response: string) {
  data.value = response
  cache.set('admin:accessToken', response)
  router.push('/')
}

async function handleSubmitUser() {
  const addAccountRequest = await signup.load({
    email: email.value,
    name: name.value,
    password: password.value
  })
  if (addAccountRequest.accessToken) {
    setValuesOnSubmitUser(addAccountRequest.accessToken)
  }
}
</script>

<template>
  <div class="login-form-container">
    <h1>Criar uma conta de advogado</h1>
    <form @submit.prevent="handleSubmitUser" class="form-container">
      <div>
        <label for="">Nome</label>
        <input placeholder="Digite seu nome" required v-model="name" />
      </div>
      <div>
        <label for="">Email</label>
        <input placeholder="Digite seu email" required v-model="email" />
      </div>
      <div>
        <label>Senha</label>
        <input type="password" placeholder="Digite sua senha" required v-model="password" />
      </div>
      <div class="login-button">
        <button @submit.prevent="handleSubmitUser">Entrar</button>
      </div>
    </form>
  </div>
</template>

<style>
.login-form-container {
  width: 60%;
  margin: 50px auto;
  height: 80vh;
}

.form-container {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  width: 50%;
  height: 20rem;
}

input {
  width: 30%;
  margin: 0 auto;
  border: 1px solid #cbd5e1;
  margin: 0 0 20px 0;
  cursor: pointer;
  padding: 10px 0px 10px 0px;
}

.login-button {
  display: block;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #cbd5e1;
  margin: 0 0 20px 0;
  cursor: pointer;
}

.login-button button {
  display: block;
  width: 100%;
  margin: auto;
  cursor: pointer;
  padding: 10px 20px 10px 5px;
}
</style>
