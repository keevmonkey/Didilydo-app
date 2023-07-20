import { plainAxiosInstance, securedAxiosInstance } from '@/backend/axios'
export default function useAxios() {
  const $plainAxios = plainAxiosInstance
  const $securedAxios = securedAxiosInstance
  return {
    $plainAxios,
    $securedAxios
  }
}
