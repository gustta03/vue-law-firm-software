<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'
import CasesModal from '../../components/CasesModal.vue'

import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxForm,
  DxItem
} from 'devextreme-vue/data-grid';
import { ref } from 'vue'
import { dependencies } from '../../dep'
import { DxPopup, DxButton } from 'devextreme-vue'

import DataSource from 'devextreme/data/data_source'

type SelectedCustomerType = {
  title: string
  awarded_amount: number
  owner: string
  status: string
  casedata: string
  customer: string
  involved_parties: any
}

const selectedDocument = ref<SelectedCustomerType>()

const { loadCases, deleteCase, editCase } = dependencies

const isModalOpen = ref(false)
const isModalRowOpen = ref(false)

const documentData = new DataSource({
  key: '_id',
  load: async () => await loadCases.load(),
  remove: async (key) => {
    await deleteCase.deleteById(key)
  },
  update: async (key, values) => {
    await editCase.edit({
      id: key,
      ...values
    })
  }
})

const reloadDataGridWithNewRow = () => {
  documentData.reload();
};


const handleRowClick = (e) => {
  selectedDocument.value = e.data
  isModalRowOpen.value = true; 
  // isEditModalOpen.value = false; 
}
</script>

<template>
  <MainContent page-title="Processos e casos">
    <div>
      <CasesModal
        :selectedDocument="selectedDocument"
        :is-modal-open="isModalOpen"
        @close-modal="isModalOpen = false"
        :reload-data-grid-with-new-row="reloadDataGridWithNewRow"
      />

      <div class="btn-save-container">
        <DxButton class="button-add" @click="isModalOpen = true" text="Add" />
      </div>
      <DxDataGrid
        @row-click="handleRowClick"
        :data-source="documentData"
        :show-borders="true"
        :focused-row-enabled="true"
        :allow-updating="true"
        :select-text-on-edit-start="true"
        :use-icons="true"
        key-expr="_id"
      >
        <DxColumn data-field="title" caption="Título" />
        <DxColumn data-field="customer" caption="Cliente" />
        <DxColumn data-field="casedata" caption="Descrição" />
        <DxColumn data-field="owner" caption="Propietario" />
        <DxColumn data-field="awarded_amount" caption="Honorarios" />        
        <DxEditing :allow-updating="true" :allow-deleting="true" mode="popup">
            <DxForm>
              <DxItem data-field="title" caption="Título" />
              <DxItem data-field="customer" caption="Cliente" />
              <DxItem data-field="casedata" caption="Descrição" />
              <DxItem data-field="owner" caption="Propietario" />
              <DxItem data-field="awarded_amount" caption="Honorarios" />
              <DxItem data-field="status" caption="Status" />
              <DxItem data-field="owner" caption="Propietario" />
              <DxItem data-field="protocol" caption="Protocolo" />
            </DxForm>
       </DxEditing>
        <DxPaging :page-size="10" />
      </DxDataGrid>

      <DxPopup :visible="isModalRowOpen" title="Detalhes do caso" :width="500" :height="380">
        <p>
          Advogado Propietario: <b>{{ selectedDocument?.owner }}</b>
        </p>
        <p>
          Titulo: <b>{{ selectedDocument?.title }}</b>
        </p>
        <p>
          Clente: <b>{{ selectedDocument?.customer }}</b>
        </p>
        <p>
          Descrição do caso: <b>{{ selectedDocument?.casedata }}</b>
        </p>
        <div class="involved-parties">
          <p>Partes envolvidas:</p>
          <b
            class="involved-card"
            v-for="(party, index) in selectedDocument?.involved_parties"
            :key="index"
          >
            {{ party.name }}
          </b>
        </div>
        <p>
          Honorarios: <b>{{ selectedDocument?.awarded_amount }}</b>
        </p>
        <p>
          Status: <b>{{ selectedDocument?.status }}</b>
        </p>
        <div class="close-modal-btn">
          <DxButton text="Fechar modal" @click="isModalRowOpen = false" />
        </div>
      </DxPopup>
    </div>
  </MainContent>
</template>

<style>
.btn-add {
  background-color: red;
}

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

.involved_parties {
  border: 1px solid red;
  width: 100%;
  margin-left: 3px;
  height: auto;
  border-radius: 5px;
  padding: 10px;
}

.involved-card {
  width: auto;
  height: auto;
  padding: 0 2px 0 2px 0;
  border-radius: 5px;
}

.close-modal-btn {
  display: flex;
  justify-content: end;
}

:global(.popup-base-settings) {
  border-radius: 20px !important;
  background-color: red;
  width: 200px;
}
</style>
