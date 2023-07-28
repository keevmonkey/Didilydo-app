<template>
  <div>
    <v-card variant="tonal">
      <v-card-title> Signup an account with Didilydo today! </v-card-title>
      <v-card-text>
        <v-form @submit.prevent @keyup.enter="signmeUp()">
          <v-text-field
            v-model="data.name"
            :rules="rules.name"
            label="Name"
            class="mb-2"
            variant="outlined"
            placeholder="Kevin Hui"
          />
          <v-text-field
            v-model="data.email"
            :rules="rules.email"
            label="Email"
            class="mb-2"
            variant="outlined"
            placeholder="didi@didilydo.com"
          />
          <v-text-field
            v-model="data.phone_number"
            :rules="rules.phone_number"
            label="Phone Number"
            class="mb-2"
            variant="outlined"
            prefix="+60"
            placeholder="176306779"
          />

          <v-text-field
            label="Password"
            class="mb-2"
            variant="outlined"
            v-model="data.password"
            :rules="rules.password"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            @click:append="show.password = !show.password"
          />
          <v-text-field
            label="Confirm Password"
            class="mb-2"
            variant="outlined"
            v-model="data.password_confirmation"
            :rules="rules.password_confirmation"
            :append-icon="show.password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password_confirmation ? 'text' : 'password'"
            @click:append="show.password_confirmation = !show.password_confirmation"
          />

          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              <div>
                I have read and agree that this app is amazing and I will use subject myself to
                questions and feedback from the creators of this website
              </div>
            </template>
          </v-checkbox>
        </v-form>
      </v-card-text>

      {{ validated }}

      <v-card-actions class="d-flex justify-center">
        <v-btn variant="elevated" color="primary" :disabled="!validated" @click="signmeUp()"
          >Sign Up</v-btn
        >
      </v-card-actions>

      <v-divider class="my-4" />

      <div class="text-center my-4">
        <p class="text-subtitle-2">Already have an account?</p>
        <v-btn variant="text" color="accent" to="/auth/signin"> Sign In </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import useLocalSession from '@/composables/useLocalSession'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useInitializeCurrentUserAccount from '@/composables/initializers/useInitializeCurrentUserAccount'
import { useSessionStore } from '@/stores/sessionStore'
import { storeToRefs } from 'pinia'

const { sessionCsrf } = storeToRefs(useSessionStore())

const checkbox = ref(false)
const router = useRouter()
const localSession = useLocalSession()
const signmeUp = async () => {
  // adjust the value so it adds +60
  const adjustedPhoneNumber = `+60${data.value.phone_number}`
  data.value.phone_number = adjustedPhoneNumber
  localSession
    .signUp(data.value)
    .then(() => handleRedirection())
    .catch((error) => console.log(error))
}
const queries = useRoute().query
const handleRedirection = async () => {
  if (queries.redirectUrl) {
    window.location.href = queries.redirectUrl as string
  } else {
    await useInitializeCurrentUserAccount()
    // await useInitializeCurrentUserPortfolioMemberships();
    router.push({ path: '/account/dashboard' })
  }
}

const show = ref({
  password: false,
  password_confirmation: false
})

const validated = computed(() => {
  console.log(rules)
  const values = Object.values(rules).flat()
  console.log('VALUES:', values)
  const values2 = values.map((item) => item[0])
  console.log('VALUES2:', values2)
  return true
})

type SignUpArguments = {
  email: string
  name: string
  phone_number: string
  password: string
  password_confirmation: string
}

const data = ref<SignUpArguments>({
  email: '',
  name: '',
  phone_number: '',
  password: '',
  password_confirmation: ''
})

const rules = {
  email: [
    (v: string) => !!v || 'email is required',
    (v: string) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Incorrect email format'
  ],
  name: [(v: string) => !!v || 'Please tell us your name'],
  password: [(v: string) => !!v || 'Please input password'],
  password_confirmation: [
    (v: string) => !!v || 'Please input password',
    (v: string) => v == data.value.password || 'Password does not match'
  ],
  phone_number: [(v: string) => !!v || 'Phone Number is required']
}
</script>
