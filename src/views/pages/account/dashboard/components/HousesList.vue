<template>
  <div>
    <app-section-header title="Houses" subtitle="Take a look into a house" text-color="info">
      <template #actions>
        <v-btn
          variant="text"
          @click="toggleActivateTheHouseForm()"
          append-icon="mdi-plus"
          text="new"
        />
      </template>
    </app-section-header>
    <v-card variant="tonal" color="secondary" class="py-4">
      <v-list-item v-for="house in houses" :key="house.id">
        <template #prepend>
          <v-avatar>
            <app-image :src="house.links.avatar" :placeholder="house.attributes.name" />
          </v-avatar>
        </template>
        <v-list-item-title>{{ house.attributes.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ house.attributes.description }}</v-list-item-subtitle>
        <template #append>
          <v-btn variant="text" icon @click="visitHouse(house)">
            <v-icon>mdi-chevron-right-circle</v-icon>
          </v-btn>
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
