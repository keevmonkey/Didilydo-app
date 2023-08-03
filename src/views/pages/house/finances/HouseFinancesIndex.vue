<template>
  <div>
    <app-section-header
      title="Finances"
      :subtitle="`Welcome to ${currentHouseName}: Finances`"
      text-color="info"
    >
      <template #actions>
        <v-btn text="New" append-icon="mdi-plus" color="info" variant="text" />
      </template>
    </app-section-header>

    <v-card variant="tonal" color="accent">
      <v-list-item density="compact" variant="tonal" base-color="error" class="py-2">
        <v-list-item-subtitle>20/11/1994</v-list-item-subtitle>
        <v-list-item-title>Groceries</v-list-item-title>
        <v-list-item-subtitle>Jaya Grocer deliveries</v-list-item-subtitle>
        <template #append>
          <v-chip color="red" variant="text"> RM 30.00 </v-chip>
        </template>
      </v-list-item>
      <v-divider />
      <v-list-item density="compact" variant="tonal" base-color="green"  class="py-2">
        <v-list-item-subtitle>22/11/1994</v-list-item-subtitle>
        <v-list-item-title>Justin Top up</v-list-item-title>
        <v-list-item-subtitle>Reimbursement from Justin Hui</v-list-item-subtitle>
        <template #append>
          <v-chip color="green" variant="text"> RM 57.20 </v-chip>
        </template>
      </v-list-item>
      <v-divider />
      <v-list-item density="compact" variant="tonal" base-color="purple" class="py-2">
        <v-list-item-subtitle>26/11/1994</v-list-item-subtitle>
        <v-list-item-title>Groceries</v-list-item-title>
        <v-list-item-subtitle>Jaya Grocer deliveries</v-list-item-subtitle>
        <template #append>
          <v-chip color="red" variant="text"> RM 30.00 </v-chip>
        </template>
      </v-list-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'

const { currentHouse, currentHouseName, currentHouseAvatar } = storeToRefs(useCurrentHouseStore())
</script>
