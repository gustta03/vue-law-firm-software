<script setup>
import { DxPopup, DxButton } from 'devextreme-vue'
import { ref, watch } from 'vue'
import { makeRemoteSaveDocument } from '../../main/factories/usecases/documents/save-document-factory'
import { makeRemoteDocument } from '../../main/factories/usecases/documents/load-docment-factory'
import { DxToast } from 'devextreme-vue/toast'

const saveDocument = makeRemoteSaveDocument()
const loadDocument = makeRemoteDocument()

const title = ref('')
const description = ref('')
const owner = ref('')
const url = ref('')
const customerId = ref('')
const isToastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

defineProps({
  buttonActionType: String,
  data: Array,
  isModalOpen: Boolean
})

const insertDocumentAndCloseModal = async () => {
  try {
    await saveDocument.save({
      title: title.value,
      description: description.value,
      owner: owner.value,
      url: url.value,
      customerId: customerId.value
    })
    toastMessage.value = "Documento salvo com sucesso"
    isToastVisible.value = true
    loadDocument.load()

  } catch (error) {
    // toastType.value = 'erro'
    toastMessage.value = error
    isToastVisible.value = true

  }
  closeModal() 
}

const emits = defineEmits(['closeModal'])

const closeModal = () => {
  emits('closeModal')
}

watch(
  () => isToastVisible.value,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      setTimeout(() => {
        isToastVisible.value = false;
      }, 1000); 
    }
  }
)



</script>

<template>
  <DxPopup
    :visible="isModalOpen"
    title="Documento"
    @onHidden="closeModal"
    :width="400"
    :height="380"
  >
    <div class="modal-content">
      <label for="taskOwner">Titulo:</label>
      <input type="text" id="taskOwner" v-model="title" />
      <label for="taskDescription">Descrição do documento</label>
      <input type="text" id="taskOwner" v-model="description" />
      <input type="text" id="taskOwner" v-model="owner" />
      <label>Cliente</label>
      <select class="select-customers" v-model="customerId">
        <option disabled value="">Selecione um usuário</option>
        <option v-for="user in data[0]" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>
      <!-- <input type="text" id="taskOwner" /> -->
      <label for="taskOwner">URL:</label>
      <input type="text" id="taskOwner" v-model="url" />
      <div class="modal-buttons-container">
        <DxButton @click="insertDocumentAndCloseModal">Salvar documento</DxButton>
        <DxButton id="btn-close" @click="closeModal">Fechar modal</DxButton>
      </div>
    </div>
  </DxPopup>

  <DxToast :visible="isToastVisible" :message="toastMessage" :type="toastType" />
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
