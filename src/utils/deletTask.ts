import saveToStorage from "./saveToStorage"
import type { Task } from "../types/task"
import type { Dispatch, SetStateAction } from "react";

type deleteTaskProps = {
  taskId:string;
  tasks:Task[];
  setTasks:Dispatch<SetStateAction<Task[]>>;
}
export default function deleteTask({taskId,tasks,setTasks}:deleteTaskProps){

  const newTasks = tasks.filter(task=>task.id !== taskId)

  setTasks(newTasks)

  saveToStorage('tasks',newTasks)

}