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
      <v-card>
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              v-model="data.name"
              :rules="rules.name"
              label="Name"
              class="mb-2"
              variant="outlined"
            />
            <v-text-field
              v-model="data.description"
              label="Description"
              class="mb-2"
              variant="outlined"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="createATask()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref<{
  name: string
  description: string
  requester_user_id: string
  owner_user_id: string
}>({
  name: '',
  description: '',
  requester_user_id: '',
  owner_user_id: ''
})

const rules = {
  name: [(v: string) => !!v || 'Name is required']
}

const activateTheHouseTaskForm = ref<boolean>(false)
const toggleActivateTheHouseTaskForm = () =>
  (activateTheHouseTaskForm.value = !activateTheHouseTaskForm.value)

import { storeToRefs } from 'pinia'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
const currentHouseTasksStore = useCurrentHouseTasksStore()
const { tasks } = storeToRefs(currentHouseTasksStore)
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
const { currentHouseSlug } = storeToRefs(useCurrentHouseStore())

import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()
const createATask = () => {
  setDefaultOwnerAndRequester()
  const params = data.value
  const endpoint = `/api/v1/houses/${currentHouseSlug.value}/tasks`
  $securedAxios
    .post(endpoint, params)
    .then((response) => {
      currentHouseTasksStore.addNewTask(response.data.data)
      // emit('submissionCompleted')
      resetData()
      toggleActivateTheHouseTaskForm()
    })
    .catch((error) => {
      console.log('error', error)
    })
}

import { useCurrentUserStore } from '@/stores/currentUserStore'
const setDefaultOwnerAndRequester = () => {
  const currentUserId = useCurrentUserStore().currentUser.id
  data.value.requester_user_id = currentUserId
  data.value.owner_user_id = currentUserId
}

const resetData = () => {
  data.value = {
    name: '',
    description: '',
    requester_user_id: '',
    owner_user_id: ''
  }
}
</script>
