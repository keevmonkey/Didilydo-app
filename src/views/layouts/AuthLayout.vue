<template>
  <v-layout ref="app" class="auth-layout-pages">
    <v-main class="auth-layout-container">
      <v-row>
        <v-col xs="12">
          <router-view v-slot="{ Component }">
            <transition name="fade-on-spot" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.auth-layout-pages {
  //background: $primary;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.auth-layout-container {
  margin: 2em auto 5em auto;
  width: 75vw;
  max-width: 1600px;
}
</style>
