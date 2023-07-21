import useApiRoutes from '@/composables/backend/useApiRoutes'
const { buildApiPath } = useApiRoutes()
import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()

import { useCurrentUserStore } from '@/stores/currentUserStore'

const filterIncluded = (includedPayload, type) =>
  includedPayload.filter((included) => included.type == type)

export default async function useInitializeCurrentUserAccount() {
  const { updateCurrentUser } = useCurrentUserStore()

  const api_v1_current_user_path = buildApiPath({
    controller: 'current_user',
    action: 'show'
  })

  await $securedAxios
    .get(api_v1_current_user_path)
    .then((response) => {
      console.log('fetch current user:', response)
      const currentUserPayload = response.data.data
      updateCurrentUser(currentUserPayload)
    })
    .catch((error) => {
      console.log('error:', error.response.data)
      return error
    })
}
