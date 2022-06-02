interface TaskItem {
  id: string;
  title: string;
  startTime: Date | string | any;
  description: string;
  status: string;
}
interface TaskCategory {
  type: string;
}
export type { TaskCategory, TaskItem };
