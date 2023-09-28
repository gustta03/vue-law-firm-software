<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'
import officeimg from '../../assets/office.svg'
import CustomStore from 'devextreme/data/custom_store'
import axios from 'axios'
import { makeRemoteGetWorkSpaces } from '../../../main/factories/usecases/load-workspace-tasks'
import { ref, onMounted, computed } from 'vue'
import {
  DxDataGrid,
  DxEditing,
  DxHeaderFilter,
  DxFilterRow,
  DxFilterPanel,
  DxPager,
  DxPaging,
  DxColumn,
  DxLookup
} from 'devextreme-vue/data-grid'
import { DxButton } from 'devextreme-vue'

interface Task {
  description: string
  owner: string
  priority: string
  id: string
}

const getAllWorkSpace = makeRemoteGetWorkSpaces()
const workspaceData = ref()
const isLoading = ref(true)

onMounted(async () => {
  const data = await getAllWorkSpace.load()
  workspaceData.value = data 
  isLoading.value = false
})

const URL = 'http://localhost:5858/api/workspace/task/';

const ordersData = new CustomStore({
  key: 'id',
  load: async () => await getAllWorkSpace.load(),
});


const hasData = computed(() => {
  return workspaceData.value.length > 0
})
</script>

<template>
  <MainContent page-title="Área de trabalho">
    <div v-if="isLoading">
      <img :src="officeimg" />
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
    <div v-else-if="hasData">
      <div class="custom-data-grid">
        <DxDataGrid
        :data-source="ordersData"
        :show-borders="true"
        :focused-row-enabled="true"
        :allow-updating="true"
        :allow-deleting="true"
        :select-text-on-edit-start="true"
        :use-icons="true"
        key-expr="id"
      >
        <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        />
          <DxColumn data-field="description" />
          <DxColumn data-field="owner" />
          <DxColumn data-field="priority" />
          <DxLookup
          :data-source="workspaceData"
          value-expr="id"

          display-expr="Ações"
        />
          <DxPaging :page-size="10" />
        </DxDataGrid>
      </div>
    </div>
    <div v-else>
      <img :src="officeimg" />
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

.option {
  background-color: red;
}
</style>
