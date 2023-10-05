<script setup lang="ts">
import { DxPopup, DxButton } from 'devextreme-vue'
import { ref, onMounted, watch } from 'vue'
import { dependencies } from '../di'
import { DxToast } from 'devextreme-vue/toast'
import CustomStore from 'devextreme/data/custom_store'

interface customerData {
  _id: string
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

const { loadCustomer, saveCase } = dependencies
const customersData = ref<customerData[]>([])
const selectedCustomer = ref({ id: '', name: '' })
const newPart = ref('')
const isToastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const formData = ref({
  title: '',
  customerId: selectedCustomer.value.id,
  customer: selectedCustomer.value.name,
  action_type: '',
  awarded_amount: 0,
  involved_parties: [
    {
      name: ''
    }
  ],
  status: '',
  owner: '',
  protocol: '',
  casedata: ''
})

defineProps({
  buttonActionType: String,
  isModalOpen: Boolean
})

onMounted(async () => {
  return customersData.value.push(await loadCustomer.load())
})

const casesData = new CustomStore({
  key: '_id',
  load: async () => await handleSaveModalOnClick()
})

async function handleSaveModalOnClick() {
  try {
    const httpResponse = await saveCase.save(formData.value)
    if (httpResponse) {
      showToast({ message: 'Caso salvo com sucesso', type: 'success' })
      closeModal()
    } else {
      showToast({ 
        message: 'Caso salvo com sucesso, tente novamente!', type: 'error' 
      })
    }

    return httpResponse
  } catch (error) {
    showToast({ message: error, type: 'error' })
  }
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

const updateCustomerName = (customer: { id: string; name: string }) => {
  formData.value.customerId = customer.id
  formData.value.customer = customer.name
}

const emits = defineEmits(['closeModal'])

const closeModal = () => {
  emits('closeModal')
}

const addPartFromCase = () => {
  formData.value.involved_parties.push({ name: newPart.value })
  newPart.value = ''
}

function showToast({ message, type }: { message: string; type: string }) {
  isToastVisible.value = true
  toastType.value = type
  toastMessage.value = message
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
      <input v-model="formData.title" type="text" id="taskOwner" />
      <label>Cliente</label>
      <label>Cliente</label>
      <select class="select-customers" v-model="selectedCustomer">
        <option disabled value="">Selecione um usuário</option>
        <option
          v-for="user in customersData[0]"
          :key="user._id"
          :value="updateCustomerName({ id: user._id, name: user.name })"
        >
          {{ user.name }}
        </option>
      </select>

      <label for="taskDescription">Tipo da ação</label>
      <input type="text" v-model="formData.action_type" />
      <label for="taskDescription">Descrição</label>
      <input type="text" v-model="formData.casedata" />
      <label for="taskDescription">Protocolo</label>
      <input type="text" v-model="formData.protocol" />
      <label for="taskDescription">Valor concedido</label>
      <input type="number" v-model="formData.awarded_amount" />
      <input v-model="newPart" placeholder="Nome da Parte Envolvida" />
    
      <p @click="addPartFromCase">Adicionar envolvido</p>
      <input type="text" />
      <label for="taskDescription">Responsaveis</label>
      <input type="text" v-model="formData.owner" />
      <label for="taskOwner">Status</label>
      <input type="text" v-model="formData.status" />
      <div class="modal-buttons-container">
        <DxButton @click="casesData.load()">Salvar Caso</DxButton>
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
