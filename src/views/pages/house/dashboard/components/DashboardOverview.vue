<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2">
          <v-card-title>Total Expenses</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, adipisci!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2" @click="travelTo('house-tasks')">
          <v-card-title>Latest Tasks</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, adipisci!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2">
          <v-card-title>Bulletin</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, adipisci!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card variant="tonal" class="ma-2">
          <v-card-title>Food</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, adipisci!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const travelTo = (name: string) => {
  router.push({
    name: name,
    params: { slug: route.params.slug }
  })
}
</script>
