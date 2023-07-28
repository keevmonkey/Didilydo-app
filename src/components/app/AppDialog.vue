<template>
  <teleport to="#dialogs">
    <div>
      <v-row justify="center">
        <v-dialog
          transition="dialog-bottom-transition"
          content-class="dialog-position-relative"
          v-model="activateDialog"
          :fullscreen="smAndDown"
          persistent
          scrollable
          :max-width="props.maxWidth"
        >
          <v-card class="app-background-white">
            <v-list-item
              :class="props.headerColor ? props.headerColor : defaultHeaderColor"
              class="py-3"
              :title="title"
              :subtitle="subtitle"
            >
              <template #prepend>
                <v-avatar :color="avatarColor" size="50">
                  <app-image :src="image" placeholder="upsettled" :cover="false" />
                  <!-- <v-img :src="props.imageUrl" v-if="props.imageUrl" /> -->
                  <!-- <v-img :src="assetImageUrl(iconLogo)" v-else /> -->
                </v-avatar>
              </template>

              <template v-slot:append>
                <div class="d-flex align-center">
                  <slot name="actions" />
                  <v-btn variant="text" icon @click="deactivateDialog()">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-list-item>

            <v-divider />
            <v-card-text style="min-height: 10vh" class="py-5">
              <slot />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useThemeSettings from '@/composables/useThemeSettings'
const { isDarkMode } = useThemeSettings()
const avatarColor = computed(() => (isDarkMode.value ? 'bg-primary' : ''))
const defaultHeaderColor = computed(() => (isDarkMode.value ? 'bg-dark' : 'bg-white'))

type TNCModalProps = {
  activate: boolean
  title: string
  subtitle: string
  imageUrl?: string
  headerColor?: string
  maxWidth?: string | number
}

const props = withDefaults(defineProps<TNCModalProps>(), {
  activate: false,
  title: '--- INSERT TITLE ---',
  subtitle: '--- INSERT SUBTITLE ---',
  headerColor: '',
  maxWidth: '1200'
})

const emit = defineEmits(['deactivate'])
const deactivateDialog = () => emit('deactivate')
const activateDialog = computed(() => props.activate)

import { useDisplay } from 'vuetify/lib/framework.mjs'
const { smAndDown } = useDisplay()

// import iconLogo from '@/assets/logos/logo-shape.svg'
// import useAssetImageUrl from '@/composables/useAssetImageUrl'
// const assetImageUrl = (imagePath: string) => useAssetImageUrl(imagePath)

const image = computed(() => {
  if (props.imageUrl) {
    return props.imageUrl
  } else {
    // return assetImageUrl(iconLogo)
    return undefined
  }
})
</script>
