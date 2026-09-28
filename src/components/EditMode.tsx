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
  function isValue() {
    return taskInputValue.trim() !== ''
  }

  function isEditing() {
    return tasks.some(
      (task) => task.id === taskId && task.isEditing
    );
  }

  function isChecked() {
    return tasks.some(
      (task) => task.id === taskId && task.isChecked
    );
  }


  function EditTask() {
    if (!isValueChanged()||!isValue()) {
        return;
      }

    const newTasks = 
    tasks.map((task) =>
        task.id === taskId
          ? { ...task, isEditing: !task.isEditing, task: taskInputValue, description:descriptionInputValue }
          : task
      )
    setTasks(newTasks);
    saveToStorage("tasks", newTasks);
  }

  return (
    <>
      {isEditing() && (
        <>
          <div 
          className={`${isEditing() && isChecked() ? 'bg-yellow-100' : 'bg-yellow-200'} flex flex-col max-h-[500px] w-full rounded-[12px] p-[10px]`}>
              <div className='flex'>
                <Button
                onClick={()=>handleEditToggle({taskId,setTasks})}
                imgSrc="/images/icons/plus.png"
                className="hover-mode active-mode"
                imgClassName='rotate-45'
                />
                <textarea
                  onKeyDown={(e) => {
                    if (e.key === "Escape"){
                        handleEditToggle({taskId,setTasks})
                      }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      EditTask();
                    }
                  }}
                  value={taskInputValue}
                  onChange={(e) => setTaskInputValue(e.target.value)}
                  placeholder="Task"
                  className="textarea h-[40px] w-full hover-mode"
                />
              </div>
              <div className='flex'>
                <textarea
                  onKeyDown={(e) => {
                    if (e.key === "Escape"){
                      handleEditToggle({taskId,setTasks})
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      EditTask();
                    }
                  }}
                  value={descriptionInputValue}
                  onChange={(e) => 
                    setDescriptionInputValue(e.target.value)}
                  placeholder="Description"
                  className="textarea w-full h-[100px] !text-[13px] text-gray-700 hover-mode" />
                <Button
                  onClick={()=>deleteTask({taskId,tasks,setTasks})}
                  imgSrc="/images/icons/trash.png"
                  className="hover-mode active-mode mt-auto"
                />
                <Button 
                imgSrc={"/images/icons/check.png"}
                onClick={()=>EditTask()}
                alt="Save task"
                disabled={!isValueChanged()}
                className={`${!isValueChanged() || !isValue()? "!cursor-not-allowed opacity-50": "hover-mode active-mode"} mt-auto `} />
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

          </>
      )}

    </>
  );
}
