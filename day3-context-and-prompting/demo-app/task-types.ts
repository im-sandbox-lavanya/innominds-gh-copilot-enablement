// Task Tracker — Type Definitions

export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "todo" | "in-progress" | "done" | "cancelled";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string;
  dueDate: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate: string; // ISO date string
  tags?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  assignee?: string;
  dueDate?: string;
  tags?: string[];
}

export interface TaskFilter {
  status?: Status;
  priority?: Priority;
  assignee?: string;
  tag?: string;
}
