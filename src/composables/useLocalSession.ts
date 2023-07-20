import { useCurrentUserStore } from '@/stores/currentUserStore'
import { useSessionStore } from '@/stores/sessionStore'
import useAxios from './backend/useAxios'
import useApiRoutes from './backend/useApiRoutes'

const { $plainAxios, $securedAxios } = useAxios()
const { buildApiPath } = useApiRoutes()

interface AccountAuthenticationParams {
  name?: string
  email: string
  password: string
  password_confirmation?: string
}

function setLocalStorageCsrf(csrf: string | null) {
  if (csrf) {
    localStorage.csrf = csrf
    localStorage.signedIn = true
  } else {
    delete localStorage.csrf
    delete localStorage.signedIn
  }
}

export default function useLocalSession() {
  const signOut = async function () {
    return await $securedAxios
      .delete(buildApiPath({ controller: 'auth', action: 'signout' }))
      .then(() => useCurrentUserStore().updateCurrentUser(undefined))
      .then(() => populateLocalSession(null))
  }

  const signIn = async function (params: AccountAuthenticationParams) {
    return await $plainAxios
      .post(buildApiPath({ controller: 'auth', action: 'signin' }), params)
      .then((response) => populateLocalSession(response.data.csrf))
      .catch((error) => error)
  }

  const signUp = async function (params: AccountAuthenticationParams) {
    return await $plainAxios
      .post(buildApiPath({ controller: 'auth', action: 'signup' }), params)
      .then((response) => {
        populateLocalSession(response.data.csrf)
      })
      .catch((error) => error)
  }

  const populateLocalSession = async (csrf: string | null) => {
    setLocalStorageCsrf(csrf)
    useSessionStore().setSessionCsrf(csrf)
  }

  return { signOut, signIn, signUp, populateLocalSession }
}
