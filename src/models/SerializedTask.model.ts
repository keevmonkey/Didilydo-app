export interface SerializedTask {
  id: string
  type: string
  attributes: TaskAttributes
  links: TaskLinks
  relationships: TaskRelationships
}

export type TaskAttributes = {
  name: string
  description: string
  priority: string
  categories: any | any[]
  status: TaskPossibleStatus
  requesterId: string
  ownerId: string
}

export type TaskLinks = {
  avatar: string | null
}

export type TaskRelationships = {
  house: { data: {} }
}

export type TaskPossibleStatus = 'unstarted' | 'started' | 'completed' | 'overdue'
