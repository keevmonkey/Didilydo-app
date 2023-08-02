<template>
  <div>
    <v-card>
      <v-card-title>Welcome to {{ currentHouseName }}: Finances</v-card-title>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'

const { currentHouse, currentHouseName, currentHouseAvatar } = storeToRefs(useCurrentHouseStore())
</script>
