<template>
  <v-layout ref="app" class="main-layout-pages">
    <v-main class="main-layout-container">
      <TheAppBar />
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import TheAppBar from '@/components/navigation/TheAppBar.vue'
import { RouterView } from 'vue-router'
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
