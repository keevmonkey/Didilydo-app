import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('sessionStore', () => {
  // const iframeLoaded = ref<boolean>(false)
  // const setIframeLoaded = async (value: boolean) => (iframeLoaded.value = value)
  const sessionCsrf = ref<string | null>(null)
  const setSessionCsrf = async (value: string | null) => (sessionCsrf.value = value)

  return {
    // iframeLoaded,
    // setIframeLoaded,
    sessionCsrf,
    setSessionCsrf
  }
})
