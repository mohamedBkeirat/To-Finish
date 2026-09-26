import saveToStorage from '../utils/saveToStorage'
import Button from './Button';
import type { Dispatch, SetStateAction } from "react";
import type { Task } from '../types/task';
import React from 'react';
import deleteTask from '../utils/deletTask';
import handleEditToggle from '../utils/handleEditToggle';
import formatDate from '../utils/formatDate';
import {Dayjs} from 'dayjs';

type addModeProps ={
  tasks: Task[]
  setTasks : Dispatch<SetStateAction<Task[]>>
  descriptionValue : string
  taskValue : string
  taskId : string,
  date:string | Dayjs
  completedDate:string | null | Dayjs
}
export default function EditMode({
  tasks,
  setTasks,
  descriptionValue,
  taskValue,
  taskId,
  date,
  completedDate
}: addModeProps) {

  const [taskInputValue,setTaskInputValue] = React.useState(taskValue)
  const [descriptionInputValue,setDescriptionInputValue] = React.useState(descriptionValue)

  function isValueChanged() {
    return taskInputValue.trim() !== taskValue || descriptionInputValue.trim() !== descriptionValue;
  }

  function isEditing(itemId: string) {
    return tasks.some(
      (task) => task.id === itemId && task.isEditing
    );
  }

  function EditTask(itemId: string) {
    if (!isValueChanged()) {
        return;
      }

    const newTasks = 
    tasks.map((task) =>
        task.id === itemId
          ? { ...task, isEditing: !task.isEditing, task: taskInputValue, description:descriptionInputValue }
          : task
      )
    setTasks(newTasks);
    saveToStorage("tasks", newTasks);
  }

  return (
    <>
      {isEditing(taskId) && (
        <>
          <div 
          className="flex flex-col w-fulld rounded-[12px] p-[5px] bg-yellow-200">
            <div className='gap-1 flex flex-col w-full'>
              <div className=' flex h-full gap-1 '>
                <Button
                onClick={()=>handleEditToggle({taskId,setTasks})}
                imgSrc="/images/icons/plus.png"
                className="h-full !w-[35px] hover-mode active-mode"
                imgClassName='rotate-45'
                />
                <textarea
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEditToggle({taskId,setTasks});
                    }
                  }}
                  value={taskInputValue}
                  onChange={(e) => setTaskInputValue(e.target.value)}
                  placeholder="Task"
                  className="textarea w-full hover-mode"
                />
              </div>
              <div className=' flex gap-1'>
               <Button
                  onClick={()=>deleteTask({taskId,tasks,setTasks})}
                  imgSrc="/images/icons/trash.png"
                  className=" h-full !w-[35px] hover-mode active-mode"
                />
                  <textarea
                    value={descriptionInputValue}
                    onChange={(e) => setDescriptionInputValue(e.target.value)}
                    placeholder="Description"
                    className="!text-[13px] w-full textarea hover-mode"
                  />
                <Button 
                imgSrc={"/images/icons/check.png"}
                onClick={()=>EditTask(taskId)}
                alt="Save task"
                disabled={!isValueChanged()}
                className={`${!isValueChanged()? 'cursor-not-allowed opacity-50' : 'hover-mode active-mode'} h-full !ml-auto !w-[35px]`} />
              </div>
              <div className='w-full'>
                <p className={`text-[10px] text-left text-gray-600`}>
                  <span className="text-black">set sat</span> {formatDate(date)}
                </p>
                { completedDate &&
                <p className={`text-green-700 text-[10px] text-left`}>
                  <span className="text-black">completed at</span> {formatDate(completedDate)}
                </p>}
              </div>
            </div>
            
          </div>            

          </>
      )}

    </>
  );
}
