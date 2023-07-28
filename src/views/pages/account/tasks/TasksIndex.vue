<template>
  <div>
    <v-list-item title="Task Index"></v-list-item>

    <v-list>
      <v-list-item title="A new task" append-icon="mdi-plus" @click="''" variant="tonal">
      </v-list-item>

      <div v-for="n in 4" :key="n">
        <v-list-item class="py-3">
          <v-list-item-title>A special task</v-list-item-title>
          <v-list-item-subtitle>Click me for pop up</v-list-item-subtitle>
          <template #append>
            <v-btn icon variant="text">
              <v-icon color="indigo">mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-list-item>
        <v-divider />
      </div>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>
