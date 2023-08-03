<template>
  <div>
    <v-list-item class="mb-3">
      <template #prepend>
        <v-avatar>
          <app-image :src="currentUserAvatar" :placeholder="currentUserName" />
        </v-avatar>
      </template>
      <v-list-item-title class="font-weight-bold text-h5 text-capitalize">{{
        currentUserName
      }}</v-list-item-title>
      <v-list-item-subtitle>Welcome to your account on Didilydo!</v-list-item-subtitle>
    </v-list-item>
    <v-divider class="my-3" />

    <FinancesList class="mb-2" />

    <HousesList class="mb-2" />

    <div>
      <app-section-header title="Bulletin" subtitle="Latest news" text-color="info" />
      <v-card variant="tonal" color="info">
        <v-list variant="text" class="text-info" density="comfortable">
          <v-list-item
            title="Somebody paid for a fan RM 24.00"
            prepend-icon="mdi-account"
            subtitle="added to the accounts"
          />
          <v-list-item
            title="Somebody paid for a fan RM 24.00"
            prepend-icon="mdi-account"
            subtitle="added to the accounts"
          />
          <v-list-item
            title="Somebody paid for a fan RM 24.00"
            prepend-icon="mdi-account"
            subtitle="added to the accounts"
          />
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import FinancesList from './components/FinancesList.vue'
import HousesList from './components/HousesList.vue'
import { useCurrentUserStore } from '@/stores/currentUserStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { currentUser, currentUserName, currentUserAvatar } = storeToRefs(useCurrentUserStore())

const title = computed(() => `Hey ${currentUserName.value}! Welcome to Didilydo!`)
</script>
