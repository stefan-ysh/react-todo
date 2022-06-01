interface TaskItem {
  title: string;
  startTime: Date | string;
  description: string;
  status: string;
}
interface TaskCategory {
  type: string;
}
export type { TaskCategory, TaskItem };
