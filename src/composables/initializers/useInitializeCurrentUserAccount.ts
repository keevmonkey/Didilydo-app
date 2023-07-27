import useApiRoutes from '@/composables/backend/useApiRoutes'
const { buildApiPath } = useApiRoutes()
import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()

import { useCurrentUserStore } from '@/stores/currentUserStore'
import { useHousesStore } from '@/stores/housesStore'

const filterIncluded = (includedPayload, type) =>
  includedPayload.filter((included) => included.type == type)

export default async function useInitializeCurrentUserAccount() {
  const { updateCurrentUser } = useCurrentUserStore()
  const { setHouses } = useHousesStore()

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

      console.log('FETCHING USER AND HOUSE', response.data)

      const houses = filterIncluded(response.data.included, 'house')
      setHouses(houses)
    })
    .catch((error) => {
      console.log('error:', error.response.data)
      return error
    })
}
