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
  passwordResetSentAt: string | undefined | null
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
