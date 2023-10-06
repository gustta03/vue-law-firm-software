<script setup lang="ts">
import { DxPopup, DxButton } from 'devextreme-vue'
import { ref, watch, onMounted, } from 'vue'
import { dependencies } from '../dep'
import CustomStore from 'devextreme/data/custom_store';

const { loadCustomer, saveDocument } = dependencies
const customersOptionsData = ref<Array<any>>([])
const isToastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')


const formData = ref({
  description: '',
  customerId: '',
  title: '',
  owner: '',
  url: ''
})

const props = defineProps([
  'buttonActionType',
  'isModalOpen',
  'reloadDataGridWithNewRow'
]);

onMounted(async () => {
  customersOptionsData.value.push(await loadCustomer.load())
})

const documentData = new CustomStore({
  key: '_id',
  load: async () => await insertDocumentAndCloseModal()
})

async function insertDocumentAndCloseModal() {
  try {
    const httpResponse = await saveDocument.save(formData.value)
    if (httpResponse) {
      showToast({ message: 'Caso salvo com sucesso', type: 'success' })
      props.reloadDataGridWithNewRow()
      closeModal()
    } else {
      showToast({ 
        message: 'um erro inesperado acontenceu, tente novamente!', type: 'error' 
      })
    }

    return httpResponse
  } catch (error) {
    showToast({ message: error, type: 'error' })
  }
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
        isToastVisible.value = false
      }, 1000)
    }
  }
)

function showToast({ message, type }: { message: string; type: string }) {
  isToastVisible.value = true
  toastType.value = type
  toastMessage.value = message
}

</script>

<template>
  <DxPopup
    :visible="isModalOpen"
    title="Documento"
    @onHidden="closeModal()"
    :width="400"
    :height="380"
  >
    <div class="modal-content">
      <label for="taskOwner">Titulo:</label>
      <input type="text" v-model="formData.title" />
      <label for="taskDescription">Descrição do documento</label>
      <input type="text" v-model="formData.description" />
      <input type="text" v-model="formData.owner" />
      <label>Cliente</label>
      <select class="select-customers" v-model="formData.customerId">
        <option disabled value="">Selecione um usuário</option>
        <option v-for="user in customersOptionsData[0]" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>

      <!-- <input type="text" id="taskOwner" /> -->
      <label for="taskOwner">URL:</label>
      <input type="text" id="taskOwner" v-model="formData.url" />
      <div class="modal-buttons-container">
        <DxButton @click="documentData.load()">Salvar documento</DxButton>
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
../dep