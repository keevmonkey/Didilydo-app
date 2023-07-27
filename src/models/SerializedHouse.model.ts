export interface SerializedHouse {
  id: string
  type: string
  attributes: HouseAttributes
  links: HouseLinks
  relationships: HouseRelationships
}

export type HouseAttributes = {
  name: string
  description: string
  address: string
  settings: any
  slug: string
}

export type HouseLinks = {
  avatar: string | null
}

export type HouseRelationships = {
  tenancies: { data: [] }
  users: { data: [] }
  taskLists: { data: [] }
  tasks: { data: [] }
}
