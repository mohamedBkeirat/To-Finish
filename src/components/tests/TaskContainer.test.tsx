import { describe, it, beforeEach, expect, afterEach,vi } from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TaskContainer from "../TaskContainer";
import React from "react";
import type { Task } from "../../types/task";
import { fireEvent } from '@testing-library/react';
const mockTasks:Task[] = [
  {
    task: "finish Code Coverage video",
    description: "",
    id: "96dde96e-4fe2-4fb4-ab93-02db0a2cf7dc",
    date: "2026-09-02T10:36:30.788",
    isChecked: false,
  },
  {
    task: "finish react testing video",
    description: "",
    id: "cfefcc56-6c8f-4ef6-9b59-202df4c01690",
    date: "2026-10-02T11:14:51.601",
    isChecked: false,
  },
];

function TestWrapper() {
  const [tasks,setTasks]= React.useState(JSON.parse(localStorage.getItem('tasks') || '[]'))

  return (
    <>
      {tasks.map((task:Task) => (
        <TaskContainer
          key={task.id}
          tasks={tasks}
          setTasks={setTasks}
          taskId={task.id}
        >
          {task.task}
        </TaskContainer>
      ))}
    </>
  );
}

describe("test suite: TaskContainer", () => {
  beforeEach(() => {
      localStorage.setItem("tasks", JSON.stringify(mockTasks));
      render(<TestWrapper />);
    });
    afterEach(()=>{
      localStorage.clear();
    })

  it("renders task titles", () => {
    expect(screen.getByText(/finish Code Coverage video/i)).toBeInTheDocument();
    expect(screen.getByText(/finish react testing video/i)).toBeInTheDocument();
  });

  it("renders task date", () => {
    expect(screen.getByText("10:36AM 02/09/2026")).toBeInTheDocument();
    expect(screen.getByText("11:14AM 02/10/2026")).toBeInTheDocument();
  });
  
  it("renders task completed date if task completed", () => {
      vi.useFakeTimers();
      const fakeDate = new Date('2026-02-09T10:38:00');
      vi.setSystemTime(fakeDate);

      const checkboxButtons = screen.getAllByRole('checkbox');

      expect(screen.queryByText(/10:38AM 09\/02\/2026/i)).not.toBeInTheDocument();

      fireEvent.click(checkboxButtons[0]);

      expect(screen.getByText(/10:38AM 09\/02\/2026/i)).toBeInTheDocument();

      vi.useRealTimers();
    });

  it("checkbox checked after click", () => {
    const checkboxButtons = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxButtons[0]);

    expect(checkboxButtons[0]).toBeChecked();

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(tasks[0].isChecked).toBe(true);

  });

  it("uncheck the checkbox if checkbox checked", () => {
  const checkboxButtons = screen.getAllByRole('checkbox')
  fireEvent.click(checkboxButtons[0]);

  expect(checkboxButtons[0]).toBeChecked();

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  expect(tasks[0].isChecked).toBe(true);

  fireEvent.click(checkboxButtons[0]);

  expect(checkboxButtons[0]).not.toBeChecked();
  
  const newTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  expect(newTasks[0].isChecked).toBe(false);


  });

  it("delete item after click delete button ", () => {

    const deleteButton = screen.getAllByRole('button')
    expect(screen.getByText(/finish Code Coverage video/i)).toBeInTheDocument();

    fireEvent.click(deleteButton[0]);

    expect(screen.queryByText(/finish Code Coverage video/i)).not.toBeInTheDocument();

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    expect(tasks).toHaveLength(1);

  });

});
