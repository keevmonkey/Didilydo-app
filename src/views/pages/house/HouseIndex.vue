<template>
  <template v-if="loading">
    <v-progress-circular indeterminate />
  </template>
  <template v-else>
    <router-view v-slot="{ Component }">
      <transition name="fade-slide-y" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </template>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const loading = ref<boolean>(true)

// or use before route enter
onMounted(async () => {
  loading.value = true
  await setCurrentHouse()
  loading.value = false
})

import { useHousesStore } from '@/stores/housesStore'
import { useCurrentHouseStore } from '@/stores/currentHouseStore'
import { storeToRefs } from 'pinia'

import { useRoute } from 'vue-router'
const route = useRoute()

const { houses } = storeToRefs(useHousesStore())
const setCurrentHouse = async () => {
  const houseSlug = route.params.slug
  const targetHouse = houses.value.find((house) => house.attributes.slug == houseSlug)
  useCurrentHouseStore().updateCurrentHouse(targetHouse)
}
</script>
