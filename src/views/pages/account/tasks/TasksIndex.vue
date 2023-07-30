<template>
  <div>
    <v-list-item title="Task Index"></v-list-item>

    <v-list>
      <div v-for="n in 4" :key="n">
        <v-list-item class="py-3">
          <v-list-item-title>A special task</v-list-item-title>
          <v-list-item-subtitle>Click me for pop up</v-list-item-subtitle>
          <template #append>
            <v-btn icon variant="text">
              <v-icon color="indigo">mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-list-item>
        <v-divider />
      </div>

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

      <v-list-item title="A new task" append-icon="mdi-plus" @click="createATask()" variant="tonal">
      </v-list-item>
    </v-list>
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

import { useTasksStore } from '@/stores/tasksStore'
const tasksStore = useTasksStore()
const { tasks } = tasksStore
import { storeToRefs } from 'pinia'
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
      tasksStore.addNewTask(response.data.data)
      // emit('submissionCompleted')
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
</script>
