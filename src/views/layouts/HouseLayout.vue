<template>
  <v-layout ref="app" class="main-layout-pages">
    <v-main class="main-layout-container">
      <TheAppBar />
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
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import TheAppBar from '@/components/navigation/TheAppBar.vue'

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

<style scoped lang="scss">
.main-layout-pages {
  min-height: 100vh;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  z-index: 1;
  position: relative;
}

.main-layout-container {
  margin: 2em auto 5em auto;
  width: 70vw;
  max-width: 1200px;
}
</style>
