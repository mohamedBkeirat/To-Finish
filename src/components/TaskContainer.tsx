import Button from "./Button";
import type { Task } from "../types/task";
import saveToStorage from '../utils/saveToStorage';
import type { Dispatch, ReactNode, SetStateAction } from "react";
import dayjs from "dayjs";
import formatDate from "../utils/formatDate";

type TaskContainerProps = {
  children: ReactNode;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>
  taskId:string
};

export default function TaskContainer({
  
  children,tasks,setTasks,taskId
}: TaskContainerProps) {

  const currentTask = tasks.find(task=>task.id === taskId)
  
  if (!currentTask) {
    return null;
}

  function deleteTask(taskId:string){

    const newTasks = tasks.filter(task=>task.id !== taskId)

    setTasks(newTasks)

    saveToStorage('tasks',newTasks)

  }
  function handleCheckState(taskId:string){

    const newTasks = tasks.map(task => {
      if (task.id !== taskId) return task;

      if (task.isChecked) {
        const { completedDate, ...rest } = task;
        return { ...rest, isChecked: false };
      }
      return { ...task, isChecked: true, completedDate: dayjs() };
    });

    setTasks(newTasks)

    saveToStorage('tasks',newTasks)
    
  }
  function isChecked(taskId:string): boolean{
    return currentTask?.isChecked ?? false
  }

  return (
    <div data-testid='task-container' className={`task-container hover-mode ${ isChecked(taskId) && ' !bg-yellow-100 '}`}>
      <input onClick={()=>handleCheckState(taskId)} checked={isChecked(taskId)} type="checkbox" className="h-[15px] w-[15px]" />


      <div className="ml-[5px]">
        <p className={` max-h-[100px]  overflow-auto max-w-[450px] break-words text-[18px] text-left ${isChecked(taskId) && 'text-gray-600 line-through'}`}>
          {children}
        </p>
          <p className={`text-[10px] text-left text-gray-600`}>
            <span className="text-black">seted at</span> {formatDate(currentTask.date)}
          </p>
          { currentTask?.completedDate &&
          <p className={`text-green-700 text-[10px] text-left`}>
            <span className="text-black">completed at</span> {formatDate(currentTask.completedDate)}
          </p>}

      </div>
      <Button
        onClick={()=>deleteTask(taskId)}
        imgSrc="/images/icons/trash.png"
        className="!m-[2px] !ml-auto !h-[35px] !w-[35px] hover-mode active-mode"
      />

    </div>
  );
}
