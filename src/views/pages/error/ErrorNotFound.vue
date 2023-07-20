<template>
  <v-layout ref="app" class="error-page">
    <v-main class="error-container">
      <v-card title="ERROR: 404" subtitle="You're not supposed to be here oops ...">
        <v-card-text>
          <p>There's no path for {{ currentRoute }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" color="indigo" :to="VITE_APP_DEFAULT_HOME_PATH"
            >Back to Home</v-btn
          >
          <v-btn variant="outlined" color="primary" to="/auth/signin">Sign In</v-btn>
          <v-btn variant="outlined" color="secondary" to="/auth/signup">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const { VITE_APP_DEFAULT_HOME_PATH } = import.meta.env

const route = useRoute()
const currentRoute = computed(() => route.fullPath)
</script>

<style scoped lang="scss">
.error-page {
  //background: $primary;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.error-container {
  margin: 2em auto 5em auto;
  width: 45vw;
  max-width: 1200px;
}
</style>
