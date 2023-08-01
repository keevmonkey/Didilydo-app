<template>
  <div>
    <v-list-item class="py-3">
      <v-list-item-title>{{ task.attributes.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ task.attributes.description }}</v-list-item-subtitle>
      <template #append>
        <div class="d-flex align-center">
          <v-chip
            variant="flat"
            :color="taskStatusColor(task.attributes.status)"
            class="text-capitalize"
          >
            {{ task.attributes.status }}

            <v-menu activator="parent">
              <v-list>
                <v-list-item subtitle="Update Status:" />
                <v-divider />
                <v-list-item
                  v-for="status in possibleStatuses"
                  :key="status"
                  class="text-capitalize"
                  :class="`text-${taskStatusColor(status as TaskPossibleStatus)}`"
                  :title="status"
                  @click="updateTaskStatus(status as TaskPossibleStatus)"
                />
              </v-list>
            </v-menu>
          </v-chip>
          <v-btn icon variant="text" color="secondary" @click="emits('toggleEditTask')">
            <v-icon>mdi-eye-circle</v-icon>
          </v-btn>
        </div>
      </template>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { TaskPossibleStatus } from '@/models/SerializedTask.model'
import { SerializedTask } from '@/models/SerializedTask.model'
const props = defineProps<{ task: SerializedTask }>()

import useTaskMixin from '@/composables/mixins/useTaskMixin'
const { statusColor: taskStatusColor } = useTaskMixin()

import { computed } from 'vue'
const possibleStatuses = computed(() => {
  let allStatus = ['unstarted', 'started', 'overdue', 'completed']
  const index = allStatus.indexOf(props.task.attributes.status)
  allStatus.splice(index, 1)
  return allStatus
})

import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'

import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()
const updateTaskStatus = (status: TaskPossibleStatus) => {
  const slug = useCurrentHouseStore().currentHouseSlug
  const endpoint = `/api/v1/houses/${slug}/tasks/${props.task.id}`
  $securedAxios
    .put(endpoint, { status })
    .then((response) => {
      useCurrentHouseTasksStore().updateTasks({ method: 'update', payload: response.data.data })
      // find task and update
    })
    .catch((error) => {
      console.log(error)
    })
}

const emits = defineEmits(['toggleEditTask'])
</script>
