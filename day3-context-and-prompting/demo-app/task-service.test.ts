import { createTask, deleteTask, getTaskById } from "./task-service";
import { CreateTaskInput } from "./task-types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeInput(overrides: Partial<CreateTaskInput> = {}): CreateTaskInput {
  return {
    title: "Fix bug #42",
    description: "Null pointer in checkout flow",
    priority: "medium",
    assignee: "alice",
    dueDate: "2026-05-01",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// createTask
// ---------------------------------------------------------------------------

describe("createTask", () => {
  const createdIds: string[] = [];

  afterEach(() => {
    createdIds.forEach((id) => deleteTask(id));
    createdIds.length = 0;
  });

  it("should return a task with all provided input fields set correctly", () => {
    // Arrange
    const input = makeInput({
      title: "Implement login",
      description: "Build the OAuth login page",
      priority: "high",
      assignee: "bob",
      dueDate: "2026-06-15",
      tags: ["auth", "frontend"],
    });

    // Act
    const task = createTask(input);
    createdIds.push(task.id);

    // Assert
    expect(task.title).toBe("Implement login");
    expect(task.description).toBe("Build the OAuth login page");
    expect(task.priority).toBe("high");
    expect(task.assignee).toBe("bob");
    expect(task.tags).toEqual(["auth", "frontend"]);
  });

  it("should set status to 'todo' by default", () => {
    // Arrange
    const input = makeInput();

    // Act
    const task = createTask(input);
    createdIds.push(task.id);

    // Assert
    expect(task.status).toBe("todo");
  });

  it("should assign a non-empty unique id to each task", () => {
    // Arrange
    const input = makeInput();

    // Act
    const task1 = createTask(input);
    const task2 = createTask(input);
    createdIds.push(task1.id, task2.id);

    // Assert
    expect(task1.id).toBeTruthy();
    expect(task2.id).toBeTruthy();
    expect(task1.id).not.toBe(task2.id);
  });

  it("should convert the dueDate ISO string to a Date object", () => {
    // Arrange
    const input = makeInput({ dueDate: "2026-05-01" });

    // Act
    const task = createTask(input);
    createdIds.push(task.id);

    // Assert
    expect(task.dueDate).toBeInstanceOf(Date);
    expect(task.dueDate.getTime()).toBe(new Date("2026-05-01").getTime());
  });

  it("should default tags to an empty array when tags are not provided", () => {
    // Arrange
    const input = makeInput({ tags: undefined });

    // Act
    const task = createTask(input);
    createdIds.push(task.id);

    // Assert
    expect(task.tags).toEqual([]);
  });

  it("should set createdAt and updatedAt to the current time on creation", () => {
    // Arrange
    const before = Date.now();
    const input = makeInput();

    // Act
    const task = createTask(input);
    createdIds.push(task.id);
    const after = Date.now();

    // Assert
    expect(task.createdAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(task.createdAt.getTime()).toBeLessThanOrEqual(after);
    expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(task.updatedAt.getTime()).toBeLessThanOrEqual(after);
  });

  it("should make the task retrievable by id after creation", () => {
    // Arrange
    const input = makeInput({ title: "Findable task" });

    // Act
    const task = createTask(input);
    createdIds.push(task.id);
    const found = getTaskById(task.id);

    // Assert
    expect(found).toBeDefined();
    expect(found?.title).toBe("Findable task");
  });
});

// ---------------------------------------------------------------------------
// deleteTask
// ---------------------------------------------------------------------------

describe("deleteTask", () => {
  it("should return true when an existing task is deleted", () => {
    // Arrange
    const task = createTask(makeInput({ title: "Task to delete" }));

    // Act
    const result = deleteTask(task.id);

    // Assert
    expect(result).toBe(true);
  });

  it("should remove the task from the store after deletion", () => {
    // Arrange
    const task = createTask(makeInput({ title: "Ephemeral task" }));

    // Act
    deleteTask(task.id);
    const found = getTaskById(task.id);

    // Assert
    expect(found).toBeUndefined();
  });

  it("should return false when the task id does not exist", () => {
    // Arrange
    const nonExistentId = "id-that-does-not-exist";

    // Act
    const result = deleteTask(nonExistentId);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false when attempting to delete an already-deleted task", () => {
    // Arrange
    const task = createTask(makeInput({ title: "Delete me twice" }));
    deleteTask(task.id);

    // Act
    const result = deleteTask(task.id);

    // Assert
    expect(result).toBe(false);
  });
});
