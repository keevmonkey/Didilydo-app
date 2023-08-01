<template>
  <v-list-item class="py-3" :class="[textColorClass, bgColorClass]">
    <template v-if="icon"> </template>
    <v-list-item-title class="font-weight-bold text-h5">
      {{ title }}
    </v-list-item-title>
    <v-list-item-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-list-item-subtitle>
    <template #append>
      <slot name="actions" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
type AppSectionHeaderProps = {
  title: string
  subtitle?: string
  icon?: string
  textColor?: string
  bgColor?: string
}

const props = withDefaults(defineProps<AppSectionHeaderProps>(), {
  title: 'Insert Title'
})

import { computed } from 'vue'

const textColorClass = computed(() => (props.textColor ? `text-${props.textColor}` : ''))
const bgColorClass = computed(() => (props.bgColor ? `bg-${props.bgColor}` : ''))
</script>
