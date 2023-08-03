<template>
  <v-app-bar :elevation="0" rounded color="primary">
    <v-app-bar-title class="text-secondary">Didilydo</v-app-bar-title>

    <template v-slot:append>
      <!-- House Nav Links -->
      <v-btn icon v-if="isHouseLayout">
        <v-icon>mdi-home-circle</v-icon>
        <v-menu activator="parent" :close-on-content-click="false">
          <v-list nav>
            <v-list-item
              :to="{ name: 'house-dashboard' }"
              :params="{ slug: houseSlug }"
              title="Dashboard"
              append-icon="mdi-menu"
            />
            <v-list-item
              :to="{ name: 'house-tasks' }"
              :params="{ slug: houseSlug }"
              title="Tasks"
              append-icon="mdi-clipboard-outline"
            />
            <v-list-item to="/" title="house" append-icon="mdi-account" />
            <v-list-item title="Settings" append-icon="mdi-cog" />
          </v-list>
        </v-menu>
      </v-btn>
      <!-- Account Nav Links -->
      <v-btn icon>
        <v-avatar>
          <app-image :src="currentUserAvatar" :placeholder="currentUserName" :cover="false" />
        </v-avatar>
        <v-menu activator="parent" :close-on-content-click="false">
          <v-list nav>
            <v-list-item
              :to="{ name: 'account-dashboard' }"
              title="Dashboard"
              append-icon="mdi-menu"
            />
            <v-list-item to="/account/tasks" title="Tasks" append-icon="mdi-clipboard-outline" />
            <v-list-item to="/" title="Account" append-icon="mdi-account" />
            <v-list-item title="Settings" append-icon="mdi-cog" />
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

import { useRoute } from 'vue-router'
const route = useRoute()

const isHouseLayout = computed(() => route.path.split('/')[1] === 'house')
const houseSlug = computed(() => route.params.slug)

import { useCurrentUserStore } from '@/stores/currentUserStore'
import { storeToRefs } from 'pinia'

const { currentUserName, currentUserAvatar } = storeToRefs(useCurrentUserStore())
</script>
