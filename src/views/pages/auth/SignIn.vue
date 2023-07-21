<template>
  <div>
    <v-list-item title="Welcome to Didilydo" subtitle="Make my dreams come through..." class="mb-3">
      <template #append>
        <v-btn variant="text" icon color="secondary">
          <v-icon>mdi-chevron-down</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="n in 3" :key="n">
                <v-list-item-title>Hello {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-list-item>
    <v-card variant="tonal">
      <v-card-title> hello this is the sign in page </v-card-title>
      <v-card-text>
        <v-form @submit.prevent @keyup.enter="signmeIn()">
          <v-text-field
            v-model="data.email"
            :rules="rules.email"
            label="Email"
            class="mb-2"
            variant="outlined"
          />
          <v-text-field
            v-model="data.password"
            :rules="rules.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            class="mb-2"
            variant="outlined"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn variant="elevated" color="primary" :disabled="isSignedIn" @click="signmeIn()"
          >Sign In</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-divider class="my-4" />

    <div class="text-center my-4">
      <p class="text-subtitle-2">Don't have an account yet?</p>
      <v-btn variant="text" color="accent" to="/auth/signup"> Sign Up </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLocalSession from '@/composables/useLocalSession'
import useInitializeCurrentUserAccount from '@/composables/initializers/useInitializeCurrentUserAccount'
import { useSessionStore } from '@/stores/sessionStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

type SignInArguments = {
  email: string
  password: string
}

const data = ref<SignInArguments>({
  email: '',
  password: ''
})

const showPassword = ref<Boolean>(false)

const rules = {
  password: [(v: string) => !!v || 'Please input password'],
  email: [
    (v: string) => !!v || 'email is required',
    (v: string) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Incorrect email format'
  ]
}

const { sessionCsrf } = storeToRefs(useSessionStore())

const isSignedIn = computed(() => (sessionCsrf.value ? true : false))

const localSession = useLocalSession()
const signmeIn = async () => {
  localSession
    .signIn({ email: data.value.email, password: data.value.password })
    .then(() => handleRedirection())
    .catch((error) => console.log(error))
}

const queries = route.query
const handleRedirection = async () => {
  if (queries.redirectUrl) {
    window.location.href = queries.redirectUrl as string
  } else {
    await useInitializeCurrentUserAccount()
    // await useInitializeCurrentUserPortfolioMemberships();
    router.push({ path: '/welcome' })
  }
}
</script>
