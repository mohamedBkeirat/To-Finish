import { describe, expect, it, vi } from "vitest";
import deleteTask from "../deletTask";
import type { Task } from "../../types/task";

describe("deleteTask", () => {

  const tasks: Task[] = [
    {
      task: "test",
      description: "",
      id: "5c43408b-45a4-4c81-baba-e0ab98502fbc",
      date: "2026-09-22T15:01:58.523Z",
      isChecked: false,
      completedDate: "2026-09-26T13:11:13.434Z",
      isEditing: false,
    },
  ];

  it("deletes a task by id", () => {
    const setTasks = vi.fn();
    const taskId = "5c43408b-45a4-4c81-baba-e0ab98502fbc";

    deleteTask({
      taskId,
      tasks,
      setTasks,
    });

    expect(setTasks).toHaveBeenCalledWith([]);
  });
  it("handles not found id", () => {
    const setTasks = vi.fn();
    const taskId = "c5c43408b-45a4-4c81-baba-e0ab98502fb";

    deleteTask({
      taskId,
      tasks,
      setTasks,
    });

    expect(setTasks).toHaveBeenCalledWith(tasks);
  });

});
