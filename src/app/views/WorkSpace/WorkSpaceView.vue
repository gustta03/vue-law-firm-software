<script setup lang="ts">
import MainContent from '../../components/MainContent.vue'
import officeimg from '../../assets/office.svg'
import { makeRemoteGetWorkSpaces } from '../../../main/factories/usecases/load-workspace-tasks'
import { computed, onMounted, ref } from 'vue'

interface Task {
  description: string
  owner: string
  priority: string
}

const getAllWorkSpace = makeRemoteGetWorkSpaces()
const workspaceData = ref<Task[]>([])

onMounted(async () => {
  const data = await getAllWorkSpace.load()
  workspaceData.value.push(data)
  console.log(workspaceData.value)
})

const isWorkspaceDataEmpty = () => {
  return workspaceData.value.length
}
console.log(workspaceData.value.length)
alert(isWorkspaceDataEmpty())
</script>

<template>
  <MainContent page-title="Area de trabalho">
    <img :src="officeimg" />
    <h4 v-if="isWorkspaceDataEmpty()">
      Reúna todas as suas atividades e estabeleça as tarefas mais importantes do dia em um único
      local
    </h4>
    <span>
      <p  v-if="isWorkspaceDataEmpty()">
        Arrume, determine prioridades e finalize suas listas de afazeres para alcançar uma rotina
        mais eficiente e ágil.
      </p>
    </span>
    <div v-show="isWorkspaceDataEmpty">workspaceData is equal to 0</div>
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
</style>
