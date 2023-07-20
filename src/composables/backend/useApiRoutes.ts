const apiBasePath = '/api/v1'
const apiRoutes = {
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    refresh: '/auth/refresh',
    signout: '/auth/signout'
  },
  current_user: {
    show: '/current_user', //base
    update: '/current_user' //base
  },
  teams: {
    index: '/teams', //base
    create: '/teams' //base
  },
  payment_account: {
    show: '/payment_account',
    create: '/payment_account',
    update: '/payment_account'
  }
}

type buildApiPathArgs = { controller: string; action: string }

export default function useApiRoutes() {
  const buildApiPath = ({ controller, action }: buildApiPathArgs) =>
    apiBasePath + apiRoutes[controller][action]
  return { buildApiPath }
}
