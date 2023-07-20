// Reference: https://medium.com/@yuliaoletskaya/rails-api-jwt-auth-vuejs-spa-eb4cf740a3ae
import axios from 'axios'
import { useSessionStore } from '@/stores/sessionStore'

const { VITE_API_BASE_URL, VITE_APP_NAME } = import.meta.env
const headerSettings = {
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const securedAxiosInstance = axios.create(headerSettings)
const plainAxiosInstance = axios.create(headerSettings)

securedAxiosInstance.interceptors.request.use((config) => {
  const csrf = useSessionStore().sessionCsrf
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    //@ts-ignore
    config.headers = {
      ...config.headers,
      // Authorization: `Bearer ${localStorage.access}`,
      'X-CSRF-Token': csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    const sessionStore = useSessionStore()
    const { sessionCsrf: csrf } = sessionStore

    const refresh_path = '/api/v1/auth/refresh'
    console.log(error)
    return plainAxiosInstance
      .post(
        refresh_path,
        {},
        {
          headers: {
            'X-CSRF-Token': csrf
          }
        }
      )
      .then((response) => {
        sessionStore.setSessionCsrf(response.data.csrf)
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true

        const retryConfig = error.response.config
        retryConfig.headers['X-CSRF-Token'] = csrf
        return plainAxiosInstance.request(retryConfig)
      })
      .catch((error) => {
        sessionStore.setSessionCsrf(null)
        delete localStorage.csrf
        delete localStorage.signedIn
        location.replace('/auth/signin')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
