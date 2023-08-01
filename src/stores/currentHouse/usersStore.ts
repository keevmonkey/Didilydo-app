import { defineStore } from 'pinia'
import { SerializedUser } from '@/models/SerializedUser.model'
import { ref } from 'vue'

export const useCurrentHouseUsersStore = defineStore('currentHouseUsersStore', () => {
  const users = ref<SerializedUser[]>()

  const addNewUser = async (payload: SerializedUser | undefined) => users.value.push(payload)

  const updateUsers = async (payload: SerializedUser[] | undefined) => {
    users.value = payload
  }

  return {
    users,
    addNewUser,
    updateUsers
  }
})
