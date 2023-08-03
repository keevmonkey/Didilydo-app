<template>
  <div>
    <app-section-header title="Tasks List" subtitle="You've got some work to do!" text-color="pink">
      <template #actions>
        <v-btn variant="text" @click="toggleActivateTheHouseTaskForm()">
          Add
          <v-icon end>mdi-plus</v-icon>
        </v-btn>
      </template>
    </app-section-header>

    <v-list>
      <div v-for="task in tasks" :key="task.id">
        <TaskItem :task="task" @toggleEditTask="setAndEditTask(task)" />
      </div>
    </v-list>

    <app-dialog
      title="Let's create a house"
      subtitle="To begin your journey on Didilydo"
      :activate="activateTheHouseTaskForm"
      @deactivate=";[toggleActivateTheHouseTaskForm(), (targetTask = null)]"
      max-width="500"
    >
      <TheTaskForm
        @deactivate=";[toggleActivateTheHouseTaskForm(), (targetTask = null)]"
        :task="targetTask"
      />
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import TheTaskForm from '@/components/forms/TheTaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import { ref } from 'vue'
const activateTheHouseTaskForm = ref<boolean>(false)
const toggleActivateTheHouseTaskForm = () => {
  activateTheHouseTaskForm.value = !activateTheHouseTaskForm.value
}

import { storeToRefs } from 'pinia'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
import { SerializedTask } from '@/models/SerializedTask.model'
const currentHouseTasksStore = useCurrentHouseTasksStore()
const { tasks } = storeToRefs(currentHouseTasksStore)

const targetTask = ref<SerializedTask>()
const setAndEditTask = async (task: SerializedTask) => {
  targetTask.value = task
  toggleActivateTheHouseTaskForm()
}
</script>
