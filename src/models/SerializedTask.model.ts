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
  dueDate: string
}

export type TaskLinks = {
  avatar: string | null
}

export type TaskRelationships = {
  house: { data: { id: string | number; type: string } }
  requester: { data: { id: string | number; type: string } }
  owner: { data: { id: string | number; type: string } }
}

export type TaskPossibleStatus = 'unstarted' | 'started' | 'completed' | 'overdue'
