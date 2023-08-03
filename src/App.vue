<template>
  <div :class="themeClass">
    <template v-if="loadingData">
      <v-progress-circular indeterminate></v-progress-circular>
    </template>

    <template v-else>
      <router-view v-slot="{ Component }">
        <transition name="fade-on-spot" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { useSessionStore } from './stores/sessionStore'
import { useTheme } from 'vuetify/lib/framework.mjs'
import useLocalSession from './composables/useLocalSession'
import useInitializeCurrentUserAccount from './composables/initializers/useInitializeCurrentUserAccount'

const darkMode = computed(() => useTheme().global.current.value.dark)
const themeClass = computed(() => {
  const className = darkMode.value
    ? 'didilydo-gradient-background--dark dark'
    : 'didilydo-gradient-background'
  return className
})
const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()

const loadingData = ref<boolean>(true)
onMounted(async () => {
  loadingData.value = true
  console.log('sessionExpired', route.query.sessionExpired)
  if (route.query.sessionExpired == 'true') {
    await clearSession()
    redirectToSignIn()
  } else {
    if (sessionStore.sessionCsrf) return
    const localCsrf = localStorage.getItem('csrf')
    if (localCsrf) {
      await reinitializeLoggedInUser(localCsrf)
      handleDefaultAppRedirection()
    } else {
      redirectToSignIn()
    }
    loadingData.value = false
  }
})

const localSession = useLocalSession()
const clearSession = async () => localSession.populateLocalSession(null)
const redirectToSignIn = async () => router.push('/auth/signin')

const reinitializeLoggedInUser = async (csrf: string): Promise<void> => {
  await sessionStore.setSessionCsrf(csrf)
  await useInitializeCurrentUserAccount()
}

import { useCurrentUserStore } from './stores/currentUserStore'
import { storeToRefs } from 'pinia'
const handleDefaultAppRedirection = async (): Promise<void> => {
  const { currentUser } = storeToRefs(useCurrentUserStore())
  if (route.path == '/') {
    const defaultApp = currentUser.value.attributes.settings.defaultApp
    if (defaultApp.type == 'account') router.push('/account/dashboard')
    if (defaultApp.type == 'house')
      router.push({
        name: 'house-dashboard',
        params: {
          slug: defaultApp.slug
        }
      })
  }
}
</script>
