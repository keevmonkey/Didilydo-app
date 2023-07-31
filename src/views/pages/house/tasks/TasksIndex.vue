<template>
  <div>
    <v-list-item title="Task Index"></v-list-item>

    <v-list>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item class="py-3">
          <v-list-item-title>{{ task.attributes.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.attributes.description }}</v-list-item-subtitle>
          <template #append>
            <v-btn icon variant="text">
              <v-icon color="indigo">mdi-eye</v-icon>
            </v-btn>

            <v-btn icon variant="text">
              <v-icon color="indigo">mdi-eye</v-icon>
              <v-menu activator="parent">
                <v-list>
                  <v-list-item v-for="status in possibleStatuses" :key="status" :title="status" />
                </v-list>
              </v-menu>
            </v-btn>
          </template>
        </v-list-item>
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
