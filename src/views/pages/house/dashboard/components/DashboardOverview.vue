<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2 text-center" @click="travelTo('house-finances')">
          <v-card-title>Total Expenses</v-card-title>
          <v-card-text>
            <div>RM <strong class="text-h3">250.00</strong></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2" @click="travelTo('house-tasks')">
          <v-card-title class="text-center">Pending Tasks</v-card-title>
          <v-card-text class="text-center">
            <div class="text-h3 text-secondary">
              {{ tasks?.length }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2">
          <v-card-title>Bulletin</v-card-title>
          <v-card-text> Feature W.I.P </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2">
          <v-card-title>Food</v-card-title>
          <v-card-text> Feature W.I.P </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'

const { tasks } = storeToRefs(useCurrentHouseTasksStore())

const router = useRouter()
const route = useRoute()

const travelTo = (name: string) => {
  router.push({
    name: name,
    params: { slug: route.params.slug }
  })
}
</script>
