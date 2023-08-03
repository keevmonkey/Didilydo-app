<template>
  <div>
    <app-section-header title="Other Tenants" subtitle="people living in here" text-color="info" />
    <v-list>
      <v-list-item v-for="user in users" :key="user.id">
        <template #prepend>
          <v-avatar>
            <app-image :src="user.links.avatar" :placeholder="user.attributes.name" />
          </v-avatar>
        </template>
        <v-list-item-title class="text-capitalize">{{ user.attributes.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.attributes.email }}</v-list-item-subtitle>
        <template #append>
          <div class="d-flex">
            <v-btn icon variant="text" color="success" size="40">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCurrentHouseUsersStore } from '@/stores/currentHouse/usersStore'

const { users } = storeToRefs(useCurrentHouseUsersStore())
</script>
