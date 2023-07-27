import { defineStore } from 'pinia'
import { SerializedHouse } from '@/models/SerializedHouse.model'
import { ref } from 'vue'

export const useHousesStore = defineStore('housesStore', () => {
  const houses = ref<SerializedHouse[]>()
  const setHouses = async (payload: SerializedHouse[]) => {
    houses.value = payload
  }
  const addHouse = async (payload: SerializedHouse) => houses.value.push(payload)

  // const updateHouses = async (
  //   payload: SerializedHouse | SerializedHouse[],
  //   method: 'index' | 'add' | 'remove' | 'update'
  // ) => {
    

  // }

  return {
    houses,
    setHouses,
    addHouse
  }
})
