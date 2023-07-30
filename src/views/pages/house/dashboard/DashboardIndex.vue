<template>
  <div>
    <v-card>
      hello
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
