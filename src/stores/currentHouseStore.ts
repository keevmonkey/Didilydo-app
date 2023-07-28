import { defineStore } from 'pinia';
import { SerializedHouse } from "@/models/SerializedHouse.model"
import { ref, computed } from 'vue';

export const useCurrentHouseStore = defineStore('currentHouseStore', () => {
  const currentHouse = ref<SerializedHouse>();
  const currentHouseName = computed(
    (): string | undefined => currentHouse.value?.attributes.name
  );
  const currentHouseAvatar = computed(
    (): string | null | undefined => currentHouse.value?.links.avatar
  );

  const updateCurrentHouse = async (payload: SerializedHouse | undefined) => {
    currentHouse.value = payload;
  };

  return {
    currentHouse,
    currentHouseName,
    currentHouseAvatar,
    updateCurrentHouse,
  };
});
