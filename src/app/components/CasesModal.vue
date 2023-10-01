<script setup>
import { DxPopup, DxButton } from 'devextreme-vue'
import { ref } from 'vue'

import { makeRemoteSaveCases } from '../../main/factories/usecases/cases/save-case-factory'

const title = ref('')
const newPart = ref({ name: '' })
const parts = ref([])

defineProps({
  buttonActionType: String,
  data: Array,
  isModalOpen: Boolean
})

const saveCaseFatory = makeRemoteSaveCases()

const emits = defineEmits(['closeModal'])
const closeModal = () => {
  emits('closeModal')
}

const addPartFromCase = () => {
  parts.value.push({ name: newPart.value.name })
  newPart.value.name = ''
}
</script>

<template>
  <DxPopup
    :visible="isModalOpen"
    title="Adicionar Caso"
    @onHidden="closeModal"
    :width="400"
    :height="380"
  >
    <div class="modal-content">
      <label for="taskOwner">Titulo:</label>
      <input v-model="title" type="text" id="taskOwner" />
      <label>Cliente</label>
      <select class="select-customers">
        <option disabled value="">Selecione um usuário</option>
        <option v-for="user in data[0]" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>
      <label for="taskDescription">Tipo da ação</label>
      <input type="text" />
      <label for="taskDescription">Valor concedido</label>
      <input type="text" />
      <input v-model="newPart.name" placeholder="Nome da Parte Envolvida" />
      <!-- <ul> -->
      <div v-for="(part, index) in parts" :key="index">{{ part.name }}</div>
      <!-- </ul> -->
      <p @click="addPartFromCase">Adicionar envolvido</p>
      <input type="text" />
      <label for="taskDescription">Responsaveis</label>
      <input type="text" />
      <!-- <input type="text" id="taskOwner" /> -->
      <label for="taskOwner">URL:</label>
      <input type="text" />
      <div class="modal-buttons-container">
        <DxButton @click="closeModal">Salvar documento</DxButton>
        <DxButton id="btn-close" @click="closeModal">Fechar modal</DxButton>
      </div>
    </div>
  </DxPopup>
</template>

<style>
.modal-buttons-container {
  display: flex;
  justify-content: end;
}

#btn-close {
  margin-left: 10px;
}
</style>
