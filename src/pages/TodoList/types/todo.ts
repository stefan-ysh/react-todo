interface TaskItem {
  id: string;
  title: string;
  startTime: string | null;
  endTime: string | null;
  planStartTime: string;
  planEndTime: string;
  description: string;
  status: string;
}
interface TaskCategory {
  type: string;
}
export type { TaskCategory, TaskItem };
