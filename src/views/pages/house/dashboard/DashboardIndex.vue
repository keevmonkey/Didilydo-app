<template>
  <div>
    <v-list-item class="py-3 mb-3">
      <template #prepend>
        <v-avatar>
          <app-image :src="currentHouseAvatar" :placeholder="currentHouseName" :cover="false" />
        </v-avatar>
      </template>
      <v-list-item-title class="font-weight-bold text-h5">{{ currentHouseName }}</v-list-item-title>
      <v-list-item-subtitle>{{ currentHouse?.attributes?.description }}</v-list-item-subtitle>
    </v-list-item>

    <v-card variant="tonal" color="info">
      <v-card-title>{{ currentHouseName }}</v-card-title>
      <v-card-text>
        <div>
          {{ currentHouse }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const houseSlug = computed(() => route.params.slug)

import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'

const { currentHouse, currentHouseName, currentHouseAvatar } = storeToRefs(useCurrentHouseStore())
</script>
