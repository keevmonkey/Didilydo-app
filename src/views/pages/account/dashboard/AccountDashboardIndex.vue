<template>
  <div>
    <v-list-item class="mb-3">
      <template #prepend>
        <v-avatar>
          <app-image :src="currentUserAvatar" :placeholder="currentUserName" />
        </v-avatar>
      </template>
      <v-list-item-title class="font-weight-bold text-h5 text-capitalize">Hello {{
        currentUserName
      }}!</v-list-item-title>
      <v-list-item-subtitle>Welcome to your account on Didilydo!</v-list-item-subtitle>
    </v-list-item>
    <v-divider class="my-3" />
    <HousesList class="mb-2" />
    <FinancesList class="mb-2" />
    <BulletinList class="mb-2" />
  </div>
</template>

<script setup lang="ts">
import FinancesList from './components/FinancesList.vue'
import HousesList from './components/HousesList.vue'
import BulletinList from './components/BulletinList.vue'
import { useCurrentUserStore } from '@/stores/currentUserStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { currentUser, currentUserName, currentUserAvatar } = storeToRefs(useCurrentUserStore())

const title = computed(() => `Hey ${currentUserName.value}! Welcome to Didilydo!`)
</script>
