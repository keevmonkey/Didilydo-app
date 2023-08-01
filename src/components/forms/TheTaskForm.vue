<template>
  <transition name="fade-on-spot">
    <v-card variant="text" v-if="loadingData">
      <v-card-text> Loading ... </v-card-text>
    </v-card>
    <v-card variant="text" v-else>
      <v-form @submit.prevent>
        <v-text-field v-model="data.name" :rules="rules.name" label="Name" variant="filled" />
        <v-textarea v-model="data.description" label="Description" variant="filled" />
        <v-text-field v-model="data.requester_id" label="Requester" variant="filled" />
        <v-text-field v-model="data.owner_id" label="Owner" variant="filled" />
      </v-form>

      {{ task }}

      <v-card-actions>
        <v-spacer />
        <v-btn v-if="task" variant="elevated" color="secondary" @click="updateATask()"
          >Confirm</v-btn
        >
        <v-btn v-else variant="elevated" color="secondary" @click="createATask()">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { SerializedTask } from '@/models/SerializedTask.model'
const props = defineProps<{ task?: SerializedTask }>()

onMounted(() => {
  loadingData.value = true
  setExistingTask()
  loadingData.value = false
})

const loadingData = ref<boolean>(true)

const setExistingTask = async () => {
  if (!props.task) return
  const { name, description } = props.task.attributes
  const { requester, owner } = props.task.relationships
  data.value = {
    name,
    description,
    requester_id: requester.data.id,
    owner_id: owner.data.id
  }
}

const data = ref<{
  name: string
  description: string
  requester_id: string | number
  owner_id: string | number
}>({
  name: '',
  description: '',
  requester_id: '',
  owner_id: ''
})

const rules = {
  name: [(v: string) => !!v || 'Name is required']
}

const emits = defineEmits(['deactivate'])

import { useCurrentUserStore } from '@/stores/currentUserStore'
const setDefaultOwnerAndRequester = () => {
  const currentUserId = useCurrentUserStore().currentUser.id
  data.value.requester_id = currentUserId
  data.value.owner_id = currentUserId
}

const resetData = () => {
  data.value = {
    name: '',
    description: '',
    requester_id: '',
    owner_id: ''
  }
}

import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
const { currentHouseSlug } = storeToRefs(useCurrentHouseStore())
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
const currentHouseTasksStore = useCurrentHouseTasksStore()

import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()

const updateATask = () => {
  const params = data.value
  const endpoint = `/api/v1/houses/${currentHouseSlug.value}/tasks/${props.task.id}`
  $securedAxios
    .put(endpoint, params)
    .then((response) => {
      currentHouseTasksStore.updateTasks({ method: 'update', payload: response.data.data })
      resetData()
      emits('deactivate')
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const createATask = () => {
  setDefaultOwnerAndRequester()
  const params = data.value
  const endpoint = `/api/v1/houses/${currentHouseSlug.value}/tasks`
  $securedAxios
    .post(endpoint, params)
    .then((response) => {
      currentHouseTasksStore.updateTasks({ method: 'add', payload: response.data.data })
      resetData()
      emits('deactivate')
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>
