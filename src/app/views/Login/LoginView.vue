<script setup lang="ts">
import { makeCacheStorage } from '../../../main/factories/cache/local-storage-factory';
import { makeRemoteSaveUser } from '../../../main/factories/usecases/attorney/save-user-factory'
import { ref } from 'vue'
import router from '../../router/index'
import { useRoute } from 'vue-router';
const isHomeRoute = useRoute().path === '/login';
const addAccount = makeRemoteSaveUser()
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
  const addAccountRequest = await addAccount.save({
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
  <div class="login-form-container" v-if="isHomeRoute">
    <h1>Acesse a plataforma</h1>
    <p>Faça login ou registre-se para começar a gerenciar seu escritório ainda hoje.</p>
    <form @submit.prevent="handleSubmitUser" class="form-container">
      <div>
        <label for="">Nome</label>
        <input placeholder="Digite seu email" required v-model="name" />
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
       <router-link to="/signup">
            <span>Não tem uma conta?</span>
          </router-link>
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
  border: 1px solid #CBD5E1;
  margin: 0 0 20px 0;
  cursor: pointer;
  padding: 10px 0px 10px 10px;
}

.login-button {
  display: block;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #CBD5E1;
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
