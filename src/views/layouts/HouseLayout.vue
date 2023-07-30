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
  await fetchCurrentHouse()
  loading.value = false
})

import { useRoute } from 'vue-router'
const route = useRoute()

import useInitializeCurrentHouse from '@/composables/initializers/useInitializeCurrentHouse'
const fetchCurrentHouse = async () => {
  const houseSlug = route.params.slug as string
  useInitializeCurrentHouse(houseSlug)
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
