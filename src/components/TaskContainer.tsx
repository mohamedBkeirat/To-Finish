import Button from "./Button";
import type { Task } from "../types/task";
import saveToStorage from '../utils/saveToStorage';
import type { Dispatch, ReactNode, SetStateAction } from "react";
import dayjs from "dayjs";
import formatDate from "../utils/formatDate";
import deleteTask from "../utils/deletTask";
import handleEditToggle from "../utils/handleEditToggle";

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

  function handleCheckState(taskId:string){

    const newTask:Task[] = tasks.map(
      
      task => task.id === taskId && !task.isChecked ? 
      
      {...task, isChecked:true ,  isEditing: false, completedDate: dayjs() }
      :
      task.id === taskId ? {...task, isChecked:false, completedDate: null } : task
    )
    setTasks(newTask)

    saveToStorage('tasks',newTask)  
  }

  function isChecked():boolean{
    return currentTask?.isChecked ?? false
  }

  return (
    <div data-testid='task-container' className={`task-container hover-mode
      ${ isChecked() && ' !bg-yellow-100 '}
      `}>
      <div className="flex p-[6px]">
        <input onClick={()=>handleCheckState(taskId)} checked={isChecked()} type="checkbox" className="h-[25px] w-[17px] rounded-[12px]" />
      </div>
      <div className="flex w-full h-full justify-between" onClick={()=>handleEditToggle({taskId, setTasks})}>
      <div>
        <p className={`max-h-[100px] overflow-auto max-w-[450px] break-words text-[18px] text-left ${isChecked() && 'text-gray-600 line-through'}`}>
          {children}
        </p>
          <p className={`text-[10px] text-left text-gray-600`}>
            <span className="text-black">set sat</span> {formatDate(currentTask.date)}
          </p>
          { currentTask?.completedDate &&
          <p className={`text-green-700 text-[10px] text-left`}>
            <span className="text-black">completed at</span> {formatDate(currentTask.completedDate)}
          </p>}

      </div>
        <Button
          onClick={()=>deleteTask({taskId,tasks,setTasks})}
          imgSrc="/images/icons/trash.png"
          className="!h-[40px] self-center !w-[40px] hover-mode active-mode"
        />
    </div>
    </div>
  );
}
