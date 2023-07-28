<template>
  <div>
    <v-card variant="tonal" color="violet" class="py-4">
      <v-list-item title="Your Houses" prepend-icon="mdi-home-group">
        <template #append>
          <v-btn
            variant="text"
            @click="toggleActivateTheHouseForm()"
            append-icon="mdi-plus"
            text="new"
          />
        </template>
      </v-list-item>
      <v-list-item v-for="house in houses" :key="house.id">
        <v-list-item-title>{{ house.attributes.name }}</v-list-item-title>
        <template #append>
          <v-btn variant="text" @click="visitHouse(house)"> Inspect </v-btn>
        </template>
      </v-list-item>
    </v-card>

    <app-dialog
      title="Let's create a house"
      subtitle="To begin your journey on Didilydo"
      :activate="activateTheHouseForm"
      @deactivate="toggleActivateTheHouseForm()"
      max-width="500"
    >
      <TheHouseForm @submissionCompleted="toggleActivateTheHouseForm()" />
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import { useHousesStore } from '@/stores/housesStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import TheHouseForm from '@/components/forms/TheHouseForm.vue'

const { houses } = storeToRefs(useHousesStore())
const activateTheHouseForm = ref<boolean>(false)
const toggleActivateTheHouseForm = () => (activateTheHouseForm.value = !activateTheHouseForm.value)

import { useRouter } from 'vue-router'
const router = useRouter()
const visitHouse = (house) => {
  router.push({
    name: 'house-dashboard',
    params: { slug: house.attributes.slug }
  })
}
</script>
