<template>
  <div>
    <v-list-item class="py-3 mb-3">
      <template #prepend>
        <v-avatar>
          <app-image :src="currentUserAvatar" :placeholder="currentUserName" />
        </v-avatar>
      </template>
      <v-list-item-title class="font-weight-bold text-h5 text-capitalize">{{ currentUserName }}</v-list-item-title>
      <v-list-item-subtitle>Welcome to your account on Didilydo!</v-list-item-subtitle>
    </v-list-item>

    <v-divider class="my-3"/>

    <DashboardHousesList />

    <v-card variant="tonal" color="info">
      <v-card-title>Bulletin</v-card-title>
      <v-card-subtitle>Latest updates about the house</v-card-subtitle>
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

    <v-card variant="tonal">
      <v-card-title> This will be the main dashboard page </v-card-title>
      <v-card-text>
        <div>
          {{ currentUser }}
        </div>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="3">
        <v-card color="surface" class="d-flex align-center justify-center">
          <v-avatar>
            <v-icon> mdi-account </v-icon>
          </v-avatar>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="accent" class="d-flex align-center justify-center">
          <v-avatar>
            <v-icon> mdi-account-supervisor </v-icon>
          </v-avatar>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="primary" class="d-flex align-center justify-center">
          <v-avatar>
            <v-icon> mdi-cash </v-icon>
          </v-avatar>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="secondary" class="d-flex align-center justify-center">
          <v-avatar>
            <v-icon> mdi-calendar </v-icon>
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card color="primary">
          <v-card-title>You have a new task!</v-card-title>
          <v-card-text>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur soluta officiis
              illum fugiat, vitae quaerat voluptatum possimus, dicta deleniti facere quidem eius! At
              atque voluptates nihil esse repellat maiores, eius nam eligendi, consectetur
              recusandae, earum vero mollitia vitae beatae corporis!
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card variant="outlined" color="secondary">
          <v-card-title>You have a new task!</v-card-title>
          <v-card-text>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur soluta officiis
              illum fugiat, vitae quaerat voluptatum possimus, dicta deleniti facere quidem eius! At
              atque voluptates nihil esse repellat maiores, eius nam eligendi, consectetur
              recusandae, earum vero mollitia vitae beatae corporis!
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import DashboardHousesList from './components/DashboardHousesList.vue'
import { useCurrentUserStore } from '@/stores/currentUserStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { currentUser, currentUserName, currentUserAvatar } = storeToRefs(useCurrentUserStore())

const title = computed(() => `Hey ${currentUserName.value}! Welcome to Didilydo!`)
</script>
