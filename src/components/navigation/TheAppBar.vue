<template>
  <v-app-bar :elevation="0" hide color="primary">
    <v-app-bar-title class="text-secondary text-h5">Didilydo</v-app-bar-title>

    <template v-slot:append>
      <!-- House Nav Links -->
      <v-btn icon v-if="isHouseLayout">
        <v-icon>mdi-home-circle</v-icon>
        <v-menu activator="parent" :close-on-content-click="true">
          <v-list nav>
            <v-list-item density="compact" class="bg-secondary">
              <v-list-item-title class="font-weight-bold ">House Nav Menu</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="houseRoute in houseRoutes"
              :key="houseRoute.name"
              :title="houseRoute.title"
              :append-icon="houseRoute.icon"
              :to="{ name: houseRoute.name }"
              :params="{ slug: houseSlug }"
            />
          </v-list>
        </v-menu>
      </v-btn>
      <!-- Account Nav Links -->
      <v-btn icon>
        <v-avatar>
          <app-image :src="currentUserAvatar" :placeholder="currentUserName" :cover="false" />
        </v-avatar>
        <v-menu activator="parent" :close-on-content-click="true">
          <v-list nav>
            <v-list-item density="compact" class="bg-secondary">
              <v-list-item-title class="font-weight-bold ">Account Nav Menu</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="accountRoute in accountRoutes"
              :key="accountRoute.name"
              :title="accountRoute.title"
              :append-icon="accountRoute.icon"
              :to="{ name: accountRoute.name }"
            />
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

import { useRoute } from 'vue-router'
const route = useRoute()

const isHouseLayout = computed(() => route.path.split('/')[1] === 'house')
const houseSlug = computed(() => route.params.slug)

import { useCurrentUserStore } from '@/stores/currentUserStore'
import { storeToRefs } from 'pinia'

const { currentUserName, currentUserAvatar } = storeToRefs(useCurrentUserStore())

// account routes
const accountRoutes = ref([
  {
    name: 'account-dashboard',
    title: 'Dashboard',
    icon: 'mdi-menu'
  },
  {
    name: 'account-tasks',
    title: 'Tasks',
    icon: 'mdi-clipboard-outline'
  },
  {
    name: 'account-settings',
    title: 'Settings',
    icon: 'mdi-cog'
  }
])

// house routes
const houseRoutes = ref([
  {
    name: 'house-dashboard',
    title: 'Dashboard',
    icon: 'mdi-menu'
  },
  {
    name: 'house-tasks',
    title: 'Tasks',
    icon: 'mdi-clipboard-outline'
  }
])
</script>
