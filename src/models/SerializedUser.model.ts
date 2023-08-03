export interface SerializedUser {
  id: string
  type: string
  attributes: UserAttributes
  links: UserLinks
  relationships: UserRelationships
}

export type UserAttributes = {
  email: string
  name: string
  phoneNumber: string
  passwordResetSentAt: string | undefined | null
  meta: UserMeta | undefined | null
  settings: UserSettings | undefined | null
}

export type UserMeta = {
  failedDestroyAttempts: number
  failedLoginAttemps: number
  lastLoggedInOn: string
  passwordLastResetOn: string
}

export type UserSettings = {
  defaultApp: {
    slug: string | undefined | null
    type: 'account' | 'house' | null
  }
}

export type UserLinks = {
  avatar: string | null
}

export type UserRelationships = {
  tenancies: { data: [] }
  houses: { data: [] }
  requestedTasks: { data: [] }
  ownedTasks: { data: [] }
}
