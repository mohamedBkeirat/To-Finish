import saveToStorage from '../utils/saveToStorage'
import dayjs from 'dayjs';
import React from 'react';
import Button from './Button';
import type { Dispatch, SetStateAction } from "react";
import type { Task } from '../types/task';

type addModeProps ={
  tasks: Task[]
  setTasks : Dispatch<SetStateAction<Task[]>>
}
export default function AddMode({
  tasks,
  setTasks,
}:addModeProps){
  const [taskValue,setTaskValue] = React.useState('')
  const [descriptionValue,setdescriptionValue] = React.useState('')
  const [isClicked , setIsClick] = React.useState(false)
function handleToggle(){
    setIsClick(!isClicked)
}
function isValue() {
  return taskValue.trim() !== "" ;
}

  function addTask(){
    if(!isValue()){
      return
  }
    const newTasks:Task[] = [...tasks, {
      task: taskValue,
      description: descriptionValue,
      id: crypto.randomUUID(),
      date: dayjs(),
      isChecked:false,
      completedDate:null
    }]
    setTasks(newTasks)
    saveToStorage('tasks',newTasks)
    handleToggle()
    setTaskValue('')
    setdescriptionValue('')
  }
  return(
    <>
      {isClicked &&
      <>
      <div className="absolute z-40 w-screen h-screen bg-gray-500/50" onClick={handleToggle} data-testid='blur-container' />
      <div className='flex justify-center items-center absolute w-screen h-screen'>
        <div className='flex z-50 gap-1 flex-col h-[180px] w-[600px] rounded-[12px] p-[5px] bg-yellow-100  mb-[100px]' data-testid='add-mode-container'>
          <textarea 
          onKeyDown={e=> {
            if(e.key === 'Enter')
              {addTask()}
            if (e.key === "Escape"){
                handleToggle()
              }
          }}
          value={taskValue}
          onChange={(e)=>{setTaskValue(e.target.value)}}
          placeholder='Task'
          className='textarea !text-[16px] hover-mode' />
          <div className=' flex h-full gap-1 '>
            <textarea 
            value={descriptionValue} 
            onChange={(e)=>{setdescriptionValue(e.target.value)}} 
            onKeyDown={e=> {
              if(e.key === 'Enter')
                {addTask()}
              if (e.key === "Escape"){
                  handleToggle()
                }
            }}
            placeholder='Description' 
            className='!text-[13px] text-gray-700 w-full textarea hover-mode' />

            <Button 
            imgSrc={"/images/icons/check.png"}
            alt="Save task"
            onClick={()=>addTask()}
            disabled={isValue()}
            className={`${!isValue() && '!cursor-not-allowed opacity-50' } hover-mode active-mode mt-auto`} />
          </div>
        </div>
      </div>
      </>
  
      }
      <Button 
      imgSrc={"/images/icons/plus.png"}
      imgClassName={`${isClicked && 'rotate-45'}!h-[25px] !w-[25px]`}
      onClick={handleToggle}
      alt="Add task"
      className='fixed !h-[50px] !w-[50px] right-10 z-50 bottom-10 hover-mode active-mode' />
    </>		

)
  }
