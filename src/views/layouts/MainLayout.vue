<template>
  <v-layout ref="app" class="main-layout-pages">
    <v-main class="main-layout-container">
      <v-list-item>
        <template #append>
          <v-btn icon variant="text">
            <v-icon>mdi-hamburger</v-icon>
            <v-menu activator="parent" location="end">
              <v-list nav>
                <v-list-item appendIcon="mdi-home" to="/welcome">Home  </v-list-item>
                <v-list-item appendIcon="mdi-home" to="/auth/signin">Sign In  </v-list-item>
                <v-list-item appendIcon="mdi-home" to="/auth/signup">Sign Out  </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-list-item>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.main-layout-pages {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.main-layout-container {
  margin: 2em auto 5em auto;
  width: 70vw;
  max-width: 1200px;
}
</style>
