<template>
  <!-- <v-img :src="imageSrc"/>  -->
  <v-img
    :max-height="maxHeight"
    :min-height="minHeight"
    :height="height"
    :max-width="maxWidth"
    :cover="cover"
    :src="image"
    :lazy-src="image"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate :color="placeholderColor" />
      </v-row>
    </template>
  </v-img>
</template>

<script setup lang="ts">
import { computed } from 'vue'
type AppImagePropsType = {
  src: string | undefined
  placeholder: string
  cover?: boolean
  height?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  maxWidth?: string | number
}

const props = withDefaults(defineProps<AppImagePropsType>(), {
  cover: true,
  placeholder: 'upsettled'
})
const placeholderImage = computed(
  () => `https://avatars.dicebear.com/api/initials/${props.placeholder}.svg`
)
const placeholderColor = computed(() => 'primary darken-1')
const image = computed(() => props.src || placeholderImage.value)
</script>
