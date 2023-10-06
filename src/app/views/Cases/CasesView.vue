<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'
import CasesModal from '../../components/CasesModal.vue'

import { DxDataGrid, DxEditing, DxPaging, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import { ref } from 'vue'
import { dependencies } from '../../dep'
import { DxButton, DxPopup } from 'devextreme-vue'

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
  isModalRowOpen.value = true
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
        :allow-deleting="true"
        :select-text-on-edit-start="true"
        :use-icons="true"
        key-expr="_id"
      >
        <DxColumn data-field="title" caption="Título" />
        <DxColumn data-field="customer" caption="Cliente" />
        <DxColumn data-field="casedata" caption="Descrição" />
        <DxColumn data-field="owner" caption="Propietario" />
        <DxEditing :allow-updating="true" :allow-deleting="true" />
        <DxLookup :data-source="documentData" value-expr="id" display-expr="Ações" />
        <DxPaging :page-size="10" />
        <div class="btn-add">
          <DxEditing
            :mode="'popup'"
            :allow-adding="true"
            :allow-updating="true"
            :allow-deleting="true"
          />
        </div>
      </DxDataGrid>

      <DxPopup :visible="isModalRowOpen" title="Detalhes do caso" :width="400" :height="380">
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
        <div>
          <p>Partes envolvidas:</p>
          <b
            class="involved_parties"
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
  border: 1px solid #dddddd;
  width: 100%;
  margin-left: 3px;
  border-radius: 5px;
  padding: 10px;
}

.close-modal-btn {
  display: flex;
  justify-content: end;
}
</style>
../../dep