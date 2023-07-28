<template>
  <v-app-bar :collapse="collapsedAppBar" :elevation="2" density="compact" rounded color="primary">
    <template #prepend>
      <v-btn :icon="collapsedMenuButton" @click="toggleCollapse()" />
    </template>
    <v-app-bar-title class="text-secondary">Didilydo</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
        <v-menu activator="parent" :close-on-content-click="false">
          <v-list nav>
            <v-list-item to="/dashboard" title="Dashboard" append-icon="mdi-menu" />
            <v-list-item to="/tasks" title="Tasks" append-icon="mdi-clipboard-outline" />
            <v-list-item to="/" title="Account" append-icon="mdi-account" />
            <v-list-item @click="''" title="Settings" append-icon="mdi-cog" />
            <TheSignOutButton />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import TheSignOutButton from './TheSignOutButton.vue'
import { ref, computed } from 'vue'

const collapsedAppBar = ref<boolean>(false)
const toggleCollapse = () => (collapsedAppBar.value = !collapsedAppBar.value)
const collapsedMenuButton = computed(() =>
  collapsedAppBar.value ? 'mdi-chevron-right' : 'mdi-chevron-left'
)
</script>
