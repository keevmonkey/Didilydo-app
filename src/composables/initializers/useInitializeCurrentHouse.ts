// import useApiRoutes from '@/composables/backend/useApiRoutes'
// const { buildApiPath } = useApiRoutes()
import useAxios from '@/composables/backend/useAxios'
const { $securedAxios } = useAxios()

import { useCurrentHouseStore } from '@/stores/currentHouse/currentHouseStore'
import { useCurrentHouseTasksStore } from '@/stores/currentHouse/tasksStore'
import { useCurrentHouseUsersStore } from '@/stores/currentHouse/usersStore'

const filterIncluded = (includedPayload, type) =>
  includedPayload.filter((included) => included.type == type)

export default async function useInitializeCurrentHouse(slug: string) {
  const { updateCurrentHouse } = useCurrentHouseStore()
  const { updateTasks } = useCurrentHouseTasksStore()
  const { updateUsers } = useCurrentHouseUsersStore()

  const endpoint = `/api/v1/houses/${slug}`

  await $securedAxios
    .get(endpoint)
    .then((response) => {
      console.log('fetch current house:', response)
      const currentHousePayload = response.data.data
      updateCurrentHouse(currentHousePayload)

      const includedPayload = response.data.included

      // Set task
      const tasks = filterIncluded(includedPayload, 'task')
      updateTasks({ method: 'index', payload: tasks })

      // Set users
      const users = filterIncluded(includedPayload, 'user')
      updateUsers(users)
    })
    .catch((error) => {
      console.log('error:', error.response.data)
      return error
    })
}
