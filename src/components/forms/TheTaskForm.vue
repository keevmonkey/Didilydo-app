<template>
  <transition name="fade-on-spot">
    <v-card variant="text" v-if="loadingData">
      <v-card-text> Loading ... </v-card-text>
    </v-card>
    <v-card variant="text" v-else>
      <v-form @submit.prevent>
        <v-text-field v-model="data.name" :rules="rules.name" label="Name" variant="filled" />
        <v-textarea v-model="data.description" label="Description" variant="filled" />

        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="data.requester_id"
              :items="users"
              chips
              color="blue-grey-lighten-2"
              item-title="attributes.name"
              item-value="id"
              label="Requester"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-avatar="item.raw.links.avatar"
                  :text="item.raw.attributes.name"
                ></v-chip>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item?.raw.links?.avatar"
                  :title="item?.raw.attributes?.name"
                  :subtitle="item?.raw?.attributes.email"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="data.owner_id"
              :items="users"
              chips
              color="blue-grey-lighten-2"
              item-title="attributes.name"
              item-value="id"
              label="Task Owner"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-avatar="item.raw.links.avatar"
                  :text="item.raw.attributes.name"
                ></v-chip>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item?.raw.links?.avatar"
                  :title="item?.raw.attributes?.name"
                  :subtitle="item?.raw?.attributes.email"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-select
          v-model="data.priority"
          label="Priority"
          variant="filled"
          :items="['low', 'normal', 'high']"
        />

        <div class="d-flex align-center justify-center">
          <VueDatePicker v-model="data.due_date" inline auto-apply />
        </div>
      </v-form>

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
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
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
  setDefaultOwnerAndRequester()
  if (!props.task) return
  const { name, description, priority, dueDate } = props.task.attributes
  const { requester, owner } = props.task.relationships
  data.value = {
    name,
    description,
    priority,
    due_date: dueDate,
    requester_id: requester.data.id,
    owner_id: owner.data.id
  }
}

const data = ref<{
  name: string
  description: string
  priority: string
  due_date: Date | string
  requester_id: string | number
  owner_id: string | number
}>({
  name: '',
  description: '',
  priority: 'normal',
  due_date: '',
  requester_id: '',
  owner_id: ''
})

const rules = {
  name: [(v: string) => !!v || 'Name is required']
}

const emits = defineEmits(['deactivate'])

import { useCurrentUserStore } from '@/stores/currentUserStore'
const setDefaultOwnerAndRequester = () => {
  if (props.task) return
  const currentUserId = useCurrentUserStore().currentUser.id
  data.value.requester_id = currentUserId
  data.value.owner_id = currentUserId
}

const resetData = () => {
  data.value = {
    name: '',
    description: '',
    priority: '',
    due_date: '',
    requester_id: '',
    owner_id: ''
  }
}

import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
const { currentHouseSlug } = storeToRefs(useCurrentHouseStore())
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
const currentHouseTasksStore = useCurrentHouseTasksStore()
import { useCurrentHouseUsersStore } from '@/stores/currentHouse/usersStore'
const { users } = storeToRefs(useCurrentHouseUsersStore())

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
