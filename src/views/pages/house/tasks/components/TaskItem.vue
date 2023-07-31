<template>
  <div>
    <v-list-item class="py-3">
      <v-list-item-title>{{ task.attributes.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ task.attributes.description }}</v-list-item-subtitle>
      <template #append>
        <v-btn icon variant="text">
          <v-icon color="indigo">mdi-eye</v-icon>
        </v-btn>

        <v-btn icon variant="text">
          <v-icon color="indigo">mdi-eye</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="status in possibleStatuses" :key="status" :title="status" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { SerializedTask } from '@/models/SerializedTask.model'
const props = defineProps<{ task: SerializedTask }>()

import { ref } from 'vue'
const possibleStatuses = ref(['unstarted', 'started', 'overdue', 'completed'])
</script>
