import { TaskPossibleStatus } from '@/models/SerializedTask.model'
export default function useTaskMixin() {
  const statusColor = (status: TaskPossibleStatus): string => {
    const color = {
      unstarted: 'grey',
      started: 'indigo',
      overdue: 'error',
      completed: 'success'
    }[status]
    return color
  }

  const priorityColor = (priority: string) => {
    const color = {
      low: 'lime',
      normal: 'primary',
      high: 'orange'
    }[priority]
    return color
  }

  return { statusColor, priorityColor }
}
