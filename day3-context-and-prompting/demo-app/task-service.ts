// Task Tracker — Service Layer

import { Task, ArchivedTask, CreateTaskInput, UpdateTaskInput, TaskFilter } from "./task-types";

const _tasks: Task[] = [];
const _archivedTasks: ArchivedTask[] = [];

function log(message: string): void {
  console.info(`[TaskService] ${message}`);
}

function randomUUID(): string {
  return Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    description: input.description,
    priority: input.priority,
    status: "todo",
    assignee: input.assignee,
    dueDate: new Date(input.dueDate),
    tags: input.tags ?? [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  _tasks.push(task);
  return task;
}

export function getTaskById(id: string): Task | undefined {
  return _tasks.find((t) => t.id === id);
}

export function listTasks(filter?: TaskFilter): Task[] {
  let result = [..._tasks];
  if (filter?.status) result = result.filter((t) => t.status === filter.status);
  if (filter?.priority) result = result.filter((t) => t.priority === filter.priority);
  if (filter?.assignee) result = result.filter((t) => t.assignee === filter.assignee);
  if (filter?.tag) result = result.filter((t) => t.tags.includes(filter.tag!));
  return result;
}

export function updateTask(id: string, input: UpdateTaskInput): Task | undefined {
  const task = _tasks.find((t) => t.id === id);
  if (!task) return undefined;
  if (input.title !== undefined) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;
  if (input.priority !== undefined) task.priority = input.priority;
  if (input.status !== undefined) task.status = input.status;
  if (input.assignee !== undefined) task.assignee = input.assignee;
  if (input.dueDate !== undefined) task.dueDate = new Date(input.dueDate);
  if (input.tags !== undefined) task.tags = input.tags;
  task.updatedAt = new Date();
  return task;
}

export function deleteTask(id: string): boolean {
  const index = _tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  _tasks.splice(index, 1);
  return true;
}

/**
 * Archives all completed ("done") tasks whose updatedAt date is older than 30 days.
 * Removes matched tasks from the active list and adds them to the archive.
 * @returns The list of tasks that were archived.
 */
export function archiveCompletedTasks(): ArchivedTask[] {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoff = thirtyDaysAgo.getTime();

  const toArchive = _tasks.filter(
    (t) => t.status === "done" && t.updatedAt.getTime() < cutoff
  );

  if (toArchive.length === 0) {
    log("No completed tasks older than 30 days found to archive.");
    return [];
  }

  const archivedAt = new Date();
  const archived: ArchivedTask[] = toArchive.map((t) => ({ ...t, archivedAt }));

  const archiveIds = new Set(toArchive.map((t) => t.id));
  const remaining = _tasks.filter((t) => !archiveIds.has(t.id));
  _tasks.length = 0;
  _tasks.push(...remaining);

  _archivedTasks.push(...archived);

  log(`Archived ${archived.length} completed task(s) older than 30 days.`);
  return archived;
}
