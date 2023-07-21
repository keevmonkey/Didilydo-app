<template>
  <v-app-bar :collapse="collapsedAppBar" :elevation="2" density="compact" rounded color="primary">
    <template #prepend>
      <v-btn :icon="collapsedMenuButton" @click="toggleCollapse()" />
    </template>
    <v-app-bar-title>Didilydo</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="''" title="Account" append-icon="mdi-account" />
            <v-list-item @click="''" title="Settings" append-icon="mdi-cog" />
            <v-list-item class="warning" @click="''" title="Logout" append-icon="mdi-exit-run" />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const collapsedAppBar = ref<boolean>(false)
const toggleCollapse = () => (collapsedAppBar.value = !collapsedAppBar.value)
const collapsedMenuButton = computed(() =>
  collapsedAppBar.value ? 'mdi-chevron-right' : 'mdi-chevron-left'
)
</script>
