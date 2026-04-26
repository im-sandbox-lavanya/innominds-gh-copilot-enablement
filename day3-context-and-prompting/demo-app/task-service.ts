// Task Tracker — Service Layer

import { Task, CreateTaskInput, UpdateTaskInput, TaskFilter } from "./task-types";
import { randomUUID } from "crypto";

const tasks: Task[] = [];

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
  tasks.push(task);
  return task;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function listTasks(filter?: TaskFilter): Task[] {
  let result = [...tasks];
  if (filter?.status) result = result.filter((t) => t.status === filter.status);
  if (filter?.priority) result = result.filter((t) => t.priority === filter.priority);
  if (filter?.assignee) result = result.filter((t) => t.assignee === filter.assignee);
  if (filter?.tag) result = result.filter((t) => t.tags.includes(filter.tag!));
  return result;
}

export function updateTask(id: string, input: UpdateTaskInput): Task | undefined {
  const task = tasks.find((t) => t.id === id);
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
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
