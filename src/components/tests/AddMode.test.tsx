import { describe, it, beforeEach, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddMode from '../AddMode'
import React from "react";
import type { Task } from "../../types/task";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/vitest";

describe('test suite: AddMode',()=>{

  function TestWrapper() {
    const [tasks,setTasks]= React.useState<Task[]>([])
  
    return (
      <>
        <AddMode
          tasks={tasks}
          setTasks={setTasks}
         />
      </>
    );
  }
  beforeEach(async() => {
    vi.spyOn(window.localStorage,'setItem')

    });
    
    afterEach(()=>{
      localStorage.clear();
    })

  it("rotate add mode button image after click", async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const addButton = screen.getByRole("button", {
      name: /add task/i,
    });

    await user.click(addButton);

    const addButtonImage = screen.getByRole("img", {
      name: /add task/i,
    });

    expect(addButtonImage).toHaveClass('rotate-45')

  }); 
  it("renders blur container and task add mode container ", async() => {
      render(<TestWrapper />);
      const user = userEvent.setup();

      const addButton = screen.getByRole("button", {
        name: /add task/i,
      });

      await user.click(addButton);

      const blurContainer = screen.getByTestId('blur-container');

      expect(blurContainer).toBeInTheDocument();

      const addModeContainer = screen.getByTestId('add-mode-container');

      expect(addModeContainer).toBeInTheDocument();

  });
  it("renders task input field and input field and save task button ", async() => {
      render(<TestWrapper />);
      const user = userEvent.setup();

      const addButton = screen.getByRole("button", {
        name: /add task/i,
      });

      await user.click(addButton);

      const taskInput =  screen.getByPlaceholderText(/Task/i)
      expect(taskInput).toBeInTheDocument()
      
      const descriptionInput =  screen.getByPlaceholderText(/Description/i)
      expect(descriptionInput).toBeInTheDocument()
      
      const saveTaskButton = screen.getByRole("button", {
        name: /Save Task/i,
      });
      expect(saveTaskButton).toBeInTheDocument()

  });
  it("adds task and description input to Task list and save it to local storage", async() => {
      render(<TestWrapper />);
      const user = userEvent.setup();

      const addButton = screen.getByRole("button", {
        name: /add task/i,
      });

      await user.click(addButton);

      const taskInput =  screen.getByPlaceholderText(/Task/i)
      await user.type(taskInput, "Finish testing");
      
      const descriptionInput =  screen.getByPlaceholderText(/Description/i)
      await user.type(descriptionInput, "learn about test coverage");

    
      const saveTaskButton = screen.getByRole("button", {
        name: /Save Task/i,
      });

      await user.click(saveTaskButton);

      const tasks = JSON.parse(localStorage.getItem('tasks')|| "[]")

      expect(tasks[0].task).toBe('Finish testing')
      expect(tasks[0].description).toBe('learn about test coverage')


  });
  it("it enables save button after typing in task field", async() => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const addButton = screen.getByRole("button", {
      name: /add task/i,
    });

    await user.click(addButton);

    const taskInput =  screen.getByPlaceholderText(/Task/i)
    await user.type(taskInput, "Finish testing");

    const saveTaskButton = screen.getByRole("button", {
      name: /Save Task/i,
    });
    expect(saveTaskButton).toBeEnabled();
  });
  it("disable save button and doesn't allow saving when the task field are empty", async() => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const addButton = screen.getByRole("button", {
      name: /add task/i,
    });

    await user.click(addButton);

    const taskInput = screen.getByPlaceholderText(/Task/i)
    
    const saveTaskButton = screen.getByRole("button", {
      name: /Save Task/i,
    });

    await user.click(saveTaskButton);

    await user.click(taskInput);
    await user.keyboard("{Enter}");

    const tasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );

    expect(tasks).toBeNull;
    expect(
      screen.getByRole("button", { name: /save task/i })
    ).toBeDisabled();
  });
  it("does not save a whitespace-only task", async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const addButton = screen.getByRole("button", {
      name: /add task/i,
    });

    await user.click(addButton);

    const taskInput = screen.getByPlaceholderText(/Task/i)

    await user.type(taskInput, "   ");

    expect(
      screen.getByRole("button", { name: /save task/i })
    ).toBeDisabled();

    await user.click(taskInput);
    await user.keyboard("{Enter}");

    expect(localStorage.getItem("tasks")).toBeNull();
  }); 
})

