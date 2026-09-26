import type { Task } from "../types/task";
import type { Dispatch, SetStateAction } from "react";

type handleEditToggleProps = {
  taskId:string;
  setTasks:Dispatch<SetStateAction<Task[]>>;
}

export default function handleEditToggle({taskId ,setTasks}:handleEditToggleProps) {
  
  setTasks((currentItems) =>
    currentItems.map((task) =>
      task.id === taskId
        ? { ...task, isEditing: !task.isEditing }
        : task
    )
    
  );
}