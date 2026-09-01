import Button from "./Button";
import type { Task } from "../types/task";
import saveToStorage from '../utils/saveToStorage';
import type { ReactNode } from "react";

type TaskContainerProps = {
  children?: ReactNode;
  tasks: Task[];
  setTasks: React.Dispatch<any>
  taskId:string
};

export default function TaskContainer({
  
  children,tasks,setTasks,taskId
}: TaskContainerProps) {

  function deleteTask(taskId:string){

    const newTasks = tasks.filter(task=>task.id !== taskId)

    setTasks(newTasks)

    saveToStorage('tasks',newTasks)

  }
  function handleCheckState(taskId:string){

    const newTasks = tasks.map(task =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task)

    setTasks(newTasks)

    saveToStorage('tasks',newTasks)
    
  }
  function isChecked(taskId:string): boolean{

    const currentTask = tasks.find(task=>task.id === taskId)
    return currentTask?.isChecked ?? false
  }

  return (
    <div className={`task-container hover-mode ${ isChecked(taskId) && ' !bg-yellow-100 '}`}>
      <input onClick={()=>handleCheckState(taskId)} checked={isChecked(taskId)} type="checkbox" className="h-[15px] w-[15px]" />

      <p className={`ml-[5px] text-[18px] ${ isChecked(taskId) && ' text-gray-600 line-through'}`}>
        {children}
      </p>

      <Button
        onClick={()=>deleteTask(taskId)}
        imgSrc="/images/icons/trash.png"
        className="!m-[2px] !ml-auto !h-[35px] !w-[35px] hover-mode active-mode"
      />
    </div>
  );
}
