<template>
  <div>
    <app-section-header
      title="Account Settings"
      subtitle="Configure your account in here ..."
      text-color="info"
    >
      <template #actions>
        <v-btn variant="text" color="info" icon="mdi-pencil" />
      </template>
    </app-section-header>
    <v-divider class="my-3" />

    <template v-if="loadingData">
      <v-progress-circular indeterminate />
    </template>
    <template v-else>
      <div>
        <v-card variant="text">
          <v-card-text>
            <v-text-field v-model="data.name" :rules="rules.name" label="Name" variant="solo" />
            <v-text-field v-model="data.email" label="email" disabled variant="solo" />
            <v-text-field
              v-model="data.phoneNumber"
              :rules="rules.name"
              label="Phone Number"
              variant="solo"
            />

            <div class="overline">Settings</div>
            <v-autocomplete
              v-model="defaultApp"
              :items="availableApps"
              chips
              color="blue-grey-lighten-2"
              item-title="name"
              return-object
              label="Default App"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" :text="item.raw.name"></v-chip>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item?.raw.name"></v-list-item>
              </template>
            </v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text="confirm" variant="elevated" color="success" @click="handleUpdate()" />
          </v-card-actions>
        </v-card>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUserStore'
import { useHousesStore } from '@/stores/housesStore'

const { currentUser, currentUserName } = storeToRefs(useCurrentUserStore())
const { houses } = storeToRefs(useHousesStore())

const loadingData = ref<boolean>(true)
onMounted(async () => {
  loadingData.value = true
  await populateFormData()
  loadingData.value = false
})

const populateFormData = async () => {
  console.log('Running On Mounted, fetch user:', currentUser.value)
  const { name, email, phoneNumber, settings } = currentUser.value.attributes
  data.value = { ...data.value, ...{ name, email, phoneNumber, settings } }
  setDefaultAppFieldValue()
}

const setDefaultAppFieldValue = () => {
  const { type, slug } = currentUser.value.attributes.settings.defaultApp
  let name = currentUserName.value
  if (type === 'house') {
    name = houses.value.find((house) => house.attributes.slug == slug).attributes.name
  }
  defaultApp.value = { name, type, slug }
}

import { UserSettings } from '@/models/SerializedUser.model'

const data = ref<{
  name: string
  email: string
  phoneNumber: string
  settings: UserSettings
}>({
  name: '',
  email: '',
  phoneNumber: '',
  settings: {
    defaultApp: {
      type: 'account',
      slug: null
    }
  }
})

const defaultApp = ref<{ name: string; type: string; slug: string | null }>()
const availableApps = computed(() => {
  let apps = [{ name: currentUser.value.attributes.name, type: 'account', slug: null }]
  houses.value.map((house) =>
    apps.push({ name: house.attributes.name, type: 'house', slug: house.attributes.slug })
  )
  return apps
})

watch(defaultApp, (newValue) => {
  data.value.settings.defaultApp = {
    type: newValue.type as 'house' | 'account',
    slug: newValue.slug
  }
})

const rules = {
  name: [(v: string) => !!v || 'Name is required']
}

import useKeyTransformer from '@/composables/backend/useKeyTransformer'
const { deepConvertKeysToSnakeCase } = useKeyTransformer()
import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()
const handleUpdate = async () => {
  const endpoint = '/api/v1/current_user'
  const params = deepConvertKeysToSnakeCase(data.value)
  $securedAxios
    .put(endpoint, params)
    .then((response) => {
      const userPayload = response.data.data
      useCurrentUserStore().updateCurrentUser(userPayload)
    })
    .catch((error) => console.log(error))
}
</script>
