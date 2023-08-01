import { defineStore } from 'pinia'
import { SerializedTask } from '@/models/SerializedTask.model'
import { ref } from 'vue'

export const useCurrentHouseTasksStore = defineStore('currentHouseTasksStore', () => {
  const tasks = ref<SerializedTask[]>()

  const addNewTask = async (payload: SerializedTask | undefined) => tasks.value.push(payload)

  const updateExistingTask = async (payload: SerializedTask) => {
    const target = tasks.value.find((task) => task.id == payload.id)
    Object.assign(target, payload)
  }

  const removeExistingTask = async (payload: SerializedTask) => {
    tasks.value = tasks.value.filter((task) => task.id != payload.id)
  }

  const setTasks = async (payload: SerializedTask[]) => (tasks.value = payload)

  type updateTasksArgs = {
    method: 'index' | 'add' | 'update' | 'remove'
    payload: SerializedTask | SerializedTask[]
  }

  const updateTasks = async ({ method, payload }: updateTasksArgs) => {
    switch (method) {
      case 'index':
        setTasks(payload as SerializedTask[])
        break
      case 'add':
        addNewTask(payload as SerializedTask)
        break
      case 'update':
        updateExistingTask(payload as SerializedTask)
        break
      case 'remove':
        removeExistingTask(payload as SerializedTask)
        break
    }
  }

  return {
    tasks,
    updateTasks
  }
})
