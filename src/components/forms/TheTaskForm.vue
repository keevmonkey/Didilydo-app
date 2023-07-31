<template>
  <v-card variant="text">
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
    <v-card-actions>
      <v-spacer />
      <v-btn variant="elevated" color="secondary" @click="createATask()">Confirm</v-btn>
    </v-card-actions>
  </v-card>
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

const emits = defineEmits(['deactivate'])

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

import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
const { currentHouseSlug } = storeToRefs(useCurrentHouseStore())
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
const currentHouseTasksStore = useCurrentHouseTasksStore()

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
      resetData()
      emits('deactivate')
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>
