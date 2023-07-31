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
        <TaskItem :task="task" />
        <v-divider />
      </div>

      <v-list-item
        title="A new task"
        append-icon="mdi-plus"
        @click="toggleActivateTheHouseTaskForm()"
        variant="tonal"
      />
    </v-list>

    <app-dialog
      title="Let's create a house"
      subtitle="To begin your journey on Didilydo"
      :activate="activateTheHouseTaskForm"
      @deactivate="toggleActivateTheHouseTaskForm()"
      max-width="500"
    >
      <TheTaskForm @deactivate="toggleActivateTheHouseTaskForm()" />
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import TheTaskForm from '@/components/forms/TheTaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import { ref } from 'vue'
const possibleStatuses = ref(['unstarted', 'started', 'overdue', 'completed'])
const activateTheHouseTaskForm = ref<boolean>(false)
const toggleActivateTheHouseTaskForm = () =>
  (activateTheHouseTaskForm.value = !activateTheHouseTaskForm.value)

import { storeToRefs } from 'pinia'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
const currentHouseTasksStore = useCurrentHouseTasksStore()
const { tasks } = storeToRefs(currentHouseTasksStore)
const newTaskStatus = ref<string>('')
const updateTaskStatus = () => {}
</script>
