<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'

import { DxDataGrid, DxEditing, DxPaging, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import { DxPopup } from 'devextreme-vue/popup'
import DataSource from 'devextreme/data/data_source'
import { DxButton } from 'devextreme-vue'
import { DxToast } from 'devextreme-vue/toast'

import { ref } from 'vue'
import { dependencies } from '../../dep'


const { deleteCustomer, editCustomer, saveCustomer, loadCustomer } = dependencies
const isToastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const formData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  cpfCnpj: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  profession: '',
  nationality: '',
  observations: ''
})

const isModalOpen = ref(false)

const customerData = new DataSource({
  key: '_id',
  load: async () => await loadCustomer.load(),
  remove: async (key) => {
    await deleteCustomer.deleteById(key)
  },
  update: async (key, values) =>
    await editCustomer.edit({
      id: key,
      ...values
    })
})

async function handleSaveCustomerOnClick() {
  try {
    const httpResponse = await saveCustomer.save(formData.value)
    if (httpResponse) {
      showToast({ message: 'Caso salvo com sucesso', type: 'success' })
      isModalOpen.value = false
      reloadDataGridWithNewRow()
    } else {
      showToast({
        message: 'Caso salvo com sucesso, tente novamente!',
        type: 'error'
      })
    }
    return httpResponse
  } catch (error) {
    showToast({ message: error, type: 'error' })
  }
}

const reloadDataGridWithNewRow = () => {
  customerData.reload();
};

function showToast({ message, type }: { message: string; type: string }) {
  isToastVisible.value = true
  toastType.value = type
  toastMessage.value = message
}

</script>

<template>
  <MainContent page-title="Clientes">
    <div>
      <div class="btn-save-container">
        <DxButton class="button-add" @click="isModalOpen = true" text="Add" />
      </div>
      <DxDataGrid
        :data-source="customerData"
        :allow-adding="true"
        :show-borders="true"
        :focused-row-enabled="true"
        :allow-updating="true"
        :allow-deleting="true"
        :select-text-on-edit-start="true"
        :use-icons="true"
        key-expr="customerId"
      >
        <DxColumn data-field="name" caption="Nome" />
        <DxColumn data-field="address" caption="Endereço" />
        <DxColumn data-field="email" caption="Email" />
        <DxColumn data-field="phone" caption="Telefone" />
        <DxEditing :allow-updating="true" :allow-deleting="true" />
        <DxLookup :data-source="customerData" value-expr="_id" display-expr="Ações" />
        <DxPaging :page-size="10" />
      </DxDataGrid>
      <DxPopup
        v-model:visible="isModalOpen"
        :hide-on-outside-click="true"
        :show-title="true"
        title="Dados do cliente"
        :height="500"
        :width="500"
        :resize-enabled="true"
        :drag-enabled="true"
        position="center"
      >
        <label>Nome</label>
        <input type="text" v-model="formData.name" />
        <label>Telefone</label>
        <input type="text" v-model="formData.phone"/>
        <label>Email</label>
        <input type="text" v-model="formData.email" />
        <label>Endereço</label>
        <input type="text" v-model="formData.address"/>
        <label>CPF/CNPJ</label>
        <input type="text" v-model="formData.cpfCnpj"/>
        <label>Data de nascimento</label>
        <input type="date" v-model="formData.dateOfBirth" />
        <label>Genero</label>
        <input type="text" v-model="formData.gender" />
        <label>Status</label>
        <input type="text" v-model="formData.maritalStatus" />
        <label>Profissão</label>
        <input type="text" v-model="formData.profession" />
        <label>Nacionalidade</label>
        <input type="text" v-model="formData.nationality" />
        <label>Observações</label>
        <input type="text" v-model="formData.observations" />
        <div class="btn-popup">
          <DxButton text="Salvar" @click="handleSaveCustomerOnClick" />
          <DxButton text="Fechar" @click="isModalOpen = false" />
        </div>
      </DxPopup>
    </div>
  </MainContent>
  <DxToast :visible="isToastVisible" :message="toastMessage" :type="toastType" />
</template>

<style>
.btn-save-container {
  display: flex;
  justify-content: end;
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
}

.buttonActionType {
  background-color: cadetblue;
}

.btn-popup {
  width: 100%;
  display: flex;
  justify-content: end;
}

label,
input {
  width: 100%;
}
</style>
../../dep