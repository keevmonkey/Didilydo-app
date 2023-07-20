import { defineStore } from 'pinia';
import { SerializedUser } from "@/models/SerializedUser.model"
import { ref, computed } from 'vue';

export const useCurrentUserStore = defineStore('currentUserStore', () => {
  const currentUser = ref<SerializedUser>();
  const currentUserName = computed(
    (): string | undefined => currentUser.value?.attributes.name
  );
  const currentUserAvatar = computed(
    (): string | null | undefined => currentUser.value?.links.avatar
  );

  const updateCurrentUser = async (payload: SerializedUser | undefined) => {
    currentUser.value = payload;
  };

  return {
    currentUser,
    currentUserName,
    currentUserAvatar,
    updateCurrentUser,
  };
});
