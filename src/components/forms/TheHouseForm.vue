<template>
  <div>
    <v-card>
      <v-form @submit.prevent @keyup.enter="createAHouse()">
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
        <v-btn @click="createAHouse()">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref<{
  name: string
  description: string
  address: string
}>({ name: '', description: '', address: '' })

const rules = {
  name: [(v: string) => !!v || 'Name is required']
}

const emit = defineEmits(['submissionCompleted'])

import { useHousesStore } from '@/stores/housesStore'
const housesStore = useHousesStore()

import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()
const createAHouse = () => {
  const params = data.value
  $securedAxios
    .post('/api/v1/houses', params)
    .then((response) => {
      housesStore.addHouse(response.data.data)
      emit('submissionCompleted')
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>
