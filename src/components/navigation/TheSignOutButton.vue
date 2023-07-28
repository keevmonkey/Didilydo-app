<template>
  <div>
    <v-list-item class="text-error py-4">
      <v-list-item-title>Sign Out</v-list-item-title>
      <v-list-item-subtitle>Are you sure you want to leave?</v-list-item-subtitle>
      <template #append>
        <v-btn variant="plain" @click="toggleActivateSignOutConfirmation()">
          Leave
          <v-icon end small>mdi-exit-run</v-icon>
        </v-btn>
      </template>
    </v-list-item>
    <app-dialog
      title="Are You Sure you want to sign out?"
      subtitle="This will sign you out"
      :activate="activateSignOutConfirmation"
      @deactivate="toggleActivateSignOutConfirmation()"
      max-width="500"
    >
      <v-card variant="flat" elevation="0">
        <v-card-actions>
          <v-btn variant="plain" @click="toggleActivateSignOutConfirmation()"
            ><v-icon start small>mdi-arrow-left</v-icon> Cancel</v-btn
          >
          <v-spacer />
          <v-btn variant="tonal" color="error" @click="handleSignOut()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLocalSession from '@/composables/useLocalSession'
import router from '@/router'
const activateSignOutConfirmation = ref<boolean>(false)
const toggleActivateSignOutConfirmation = () =>
  (activateSignOutConfirmation.value = !activateSignOutConfirmation.value)

const localSession = useLocalSession()
const handleSignOut = async () => {
  localSession.signOut().then(() => {
    router.replace('/auth/signin')
  })
}
</script>
