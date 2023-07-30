import { defineStore } from 'pinia'
import { SerializedTask } from '@/models/SerializedTask.model'
import { ref } from 'vue'

export const useCurrentHouseTasksStore = defineStore('currentHouseTasksStore', () => {
  const tasks = ref<SerializedTask[]>()

  const addNewTask = async (payload: SerializedTask | undefined) => tasks.value.push(payload)

  const updateTasks = async (payload: SerializedTask[] | undefined) => {
    tasks.value = payload
  }

  return {
    tasks,
    addNewTask,
    updateTasks
  }
})
