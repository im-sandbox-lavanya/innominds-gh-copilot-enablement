// Task Tracker — Observer Pattern for Task Lifecycle Events

import type { Task, Status } from "./task-types";

export interface TaskEventPayloads {
  created: { task: Task };
  updated: { task: Task };
  deleted: { taskId: string };
  statusChanged: { task: Task; oldStatus: Status; newStatus: Status };
}

export type TaskEventName = keyof TaskEventPayloads;

type TaskEventHandler<E extends TaskEventName> = (
  payload: TaskEventPayloads[E]
) => void;

function log(message: string): void {
  console.info(`[TaskEventEmitter] ${message}`);
}

/** Manages subscriptions and dispatches for task lifecycle events. */
export class TaskEventEmitter {
  private readonly listeners: {
    [E in TaskEventName]?: Set<TaskEventHandler<E>>;
  } = {};

  /**
   * Registers a listener for the given event.
   * @param event - The task lifecycle event name.
   * @param handler - Callback invoked when the event is emitted.
   */
  on<E extends TaskEventName>(
    event: E,
    handler: TaskEventHandler<E>
  ): void {
    if (!this.listeners[event]) {
      (this.listeners as Record<string, Set<unknown>>)[event] = new Set();
    }
    (this.listeners[event] as Set<TaskEventHandler<E>>).add(handler);
    log(`Listener registered for "${event}"`);
  }

  /**
   * Removes a previously registered listener for the given event.
   * @param event - The task lifecycle event name.
   * @param handler - The exact handler reference passed to `on()`.
   */
  off<E extends TaskEventName>(
    event: E,
    handler: TaskEventHandler<E>
  ): void {
    const set = this.listeners[event] as Set<TaskEventHandler<E>> | undefined;
    if (set?.delete(handler)) {
      log(`Listener removed for "${event}"`);
    }
  }

  /**
   * Emits a task lifecycle event, invoking all registered listeners.
   * @param event - The task lifecycle event name.
   * @param payload - The event payload matching the event type.
   */
  emit<E extends TaskEventName>(
    event: E,
    payload: TaskEventPayloads[E]
  ): void {
    const set = this.listeners[event] as Set<TaskEventHandler<E>> | undefined;
    if (!set || set.size === 0) {
      return;
    }
    log(`Emitting "${event}" to ${set.size} listener(s)`);
    for (const handler of set) {
      handler(payload);
    }
  }
}
