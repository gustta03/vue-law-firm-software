<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MainContent from '../../components/MainContent.vue';
import CustomStore from 'devextreme/data/custom_store';
import DocumentModal from '../../components/DocumentModal.vue';
import CaseModal from '../../components/CasesModal.vue';

import { DxButton } from 'devextreme-vue'

import { DxDataGrid, DxEditing, DxPaging, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import { dependencies } from '../../dep';

const {
  getAllWorkSpace,
  deleteWorkspaceTask,
  insertWorkSpaceTask,
  editWorkSpaceTask,
  loadDocument,
  loadCustomer,
  loadCases,
} = dependencies; 

interface Task {
  description: string;
  owner: string;
  priority: string;
  id: string;
}

const workspaceData = ref<Task[]>([]);
const isLoading = ref(true);
const documentData = ref<any[]>([]);
const customersData = ref<Array<any>>([]);
const isDocumentModalOpen = ref(false);
const isCaseModalOpen = ref(false);
const cases = ref<any[]>([]);
const buttonActionType = ref<'cases' | 'doc' | null>(null);

onMounted(async () => {
  try {
    documentData.value.push(await loadDocument.load());
    workspaceData.value.push(await getAllWorkSpace.load());
    cases.value.push(await loadCases.load());
    isLoading.value = false;
  } catch (error) {
    console.error('Error:', error);
  }
});

const workspaceTaskData = new CustomStore({
  key: 'id',
  insert: (values) => insertWorkSpaceTask.insert(values),
  load: async () => await getAllWorkSpace.load(),
  remove: async (key: string) => {
    try {
      await deleteWorkspaceTask.deleteById(key);
    } catch (error) {
      console.error('Error:', error);
    }
  },
  update: async (key, values) => {
    try {
      await editWorkSpaceTask.edit({
        id: key,
        ...values,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  },
});

const openDocumentModal = async () => {
  try {
    isDocumentModalOpen.value = true;
    buttonActionType.value = 'doc';
  } catch (error) {
    console.error('Error:', error);
  }
};

const openCaseModal = async () => {
  try {
    customersData.value.push(await loadCustomer.load());
    isCaseModalOpen.value = true;
    buttonActionType.value = 'cases';
  } catch (error) {
    console.error('Error:', error);
  }
};

const documentLength = computed(() => {
  return Object.keys(documentData.value[0] || {}).length;
});

const casesLength = computed(() => {
  return Object.keys(cases.value[0] || {}).length;
});

const hasData = computed(() => {
  return workspaceData.value.length > 0;
});
</script>

<template>
  <MainContent page-title="Área de trabalho">
    <!-- <div v-for="user in customersData" :key="user._id" :value="user._id">
      <p>{{ user.address }}</p>
    </div> -->
    <div v-if="isLoading">
      <h4>
        Reúna todas as suas atividades e estabeleça as tarefas mais importantes do dia em um único
        local
      </h4>
      <span>
        <p>
          Arrume, determine prioridades e finalize suas listas de afazeres para alcançar uma rotina
          mais eficiente e ágil.
        </p>
      </span>
    </div>
    <div v-else-if="hasData" class="grid-container">
      <div class="custom-data-grid">
        <!-- Adicione o componente CustomAddButton aqui -->
        <CustomAddButton />

        <DxDataGrid
          :data-source="workspaceTaskData"
          :show-borders="true"
          :focused-row-enabled="true"
          :allow-updating="true"
          :allow-deleting="true"
          :select-text-on-edit-start="true"
          :use-icons="true"
          key-expr="id"
        >
        <DxEditing :allow-adding="true" :allow-updating="true" :allow-deleting="true" />
        <DxColumn data-field="description" />
          <DxColumn data-field="owner" />
          <DxColumn data-field="priority" />
          <DxLookup :data-source="workspaceData" value-expr="id" display-expr="Ações" />
          <DxPaging :page-size="10" />
        </DxDataGrid>
      </div>
      <div class="container">
        <div class="document-widget">
          <div>
            <p>Processos/casos</p>
            <DxButton @click="openCaseModal" text="Adicionar" />
          </div>
          <p>Processos movimentados recentemente: {{ casesLength }}</p>
        </div>
        <div class="document-widget">
          <div>
            <p>Documentos</p>
            <DxButton @click="openDocumentModal" text="Adicionar" />
          </div>
          
           <DocumentModal :data="customersData" button-action-type="doc" :is-modal-open="isDocumentModalOpen" @close-modal="isDocumentModalOpen = false" />
           <CaseModal button-action-type="Processos e casos" :data="customersData" :is-modal-open="isCaseModalOpen" @close-modal="isCaseModalOpen = false" />
          <p>Documentos movimentados recentemente: {{ documentLength }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Reúna todas as suas atividades...</h4>
      <p>Arrume, determine prioridades e finalize suas listas...</p>
    </div>
  </MainContent>
</template>

<style>
img {
  width: 20rem;
}

.header-content {
  background-color: aquamarine;
  display: flex;
}

button {
  width: 30px;
}

.container div {
  margin-bottom: 5px;
}

.option {
  background-color: red;
}

.select-customers {
  width: 100%;
  padding: 10px;
  display: block;
  margin-bottom: 10px;
}

.document-widget {
  background-color: rgb(255, 255, 255);
  margin-top: 320px;
  height: 10rem;
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin: 0 0 0 10px;
}

.modal-content input {
  width: 100%;
}

.document-widget div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.grid-container {
  display: flex;
}

.popup {
  width: 50%;
  background-color: red;
}

.custom-data-grid {
  display: flex;
  max-width: auto;
  margin: 0 auto;
  height: 50vh;
}
</style>
../../dep