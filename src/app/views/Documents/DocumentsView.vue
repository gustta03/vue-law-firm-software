<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'
import DocumentModal from '../../components/DocumentModal.vue'

import { DxDataGrid, DxEditing, DxPaging, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import { ref } from 'vue'
import { dependencies } from '../../dep'
import { DxButton } from 'devextreme-vue'
import DataSource from 'devextreme/data/data_source'

const { loadDocument, deleteDocument } = dependencies

const isModalOpen = ref(false)

const documentData = new DataSource({
  key: '_id',
  load: async () => await loadDocument.load(),
  remove: async (key) => {
    await deleteDocument.deleteById(key)
  }
})

const reloadDataGridWithNewRow = () => {
  documentData.reload();
};

const openSaveDocumentModal = () => {
  isModalOpen.value = true
}
</script>

<template>
  <MainContent page-title="Documentos">
    <div>
      <DocumentModal :is-modal-open="isModalOpen" @close-modal="isModalOpen = false" :reload-data-grid-with-new-row="reloadDataGridWithNewRow"/>

      <div class="btn-save-container">
        <DxButton class="button-add" @click="openSaveDocumentModal" text="Add" />
      </div>
      <DxDataGrid :data-source="documentData" :show-borders="true" :focused-row-enabled="true" :allow-updating="true"
        :allow-deleting="true" :select-text-on-edit-start="true" :use-icons="true" key-expr="customerId">
        <DxColumn data-field="description" caption="Descrição" />
        <DxColumn data-field="title" caption="Título" />
        <DxColumn data-field="owner" caption="Proprietário" />
        <DxColumn data-field="url" caption="URL" />
        <DxEditing :allow-updating="false" :allow-deleting="true" />
        <DxLookup :data-source="documentData" value-expr="id" display-expr="Ações" />
        <DxPaging :page-size="10" />
      </DxDataGrid>
    </div>
  </MainContent>
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
</style>
../../dep