import saveToStorage from '../utils/saveToStorage'
import dayjs from 'dayjs';
import React from 'react';
import Button from './Button';

type addModeProps ={
  tasks: string
  setTasks : React.Dispatch<any>
}
export default function AddMode({tasks,setTasks}:addModeProps){
  
  const [isClicked , setIsClick] = React.useState(false)
  const [taskValue,setTaskValue] = React.useState('')
  const [taskDescriptionValue,settaskDescriptionValue] = React.useState('')

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
    const newTasks = [...tasks, {
      task:taskValue,
      descrption : taskDescriptionValue,
      id : crypto.randomUUID(),
      date: dayjs(),
      isClicked:false
    }]
    setTasks(newTasks)
    saveToStorage('tasks',newTasks)
    handleToggle()
    setTaskValue('')
    settaskDescriptionValue('')
  }
  return(
    <>
      {isClicked &&
      <div className="blur-container">
        <div className='add-container'>
          <textarea 
          value={taskValue}
          onChange={(e)=>{setTaskValue(e.target.value)}}
          placeholder='Task'
          className='textarea hover-mode' />
          <textarea 
          value={taskDescriptionValue} 
          onChange={(e)=>{settaskDescriptionValue(e.target.value)}} 
          placeholder='Descrption' 
          className='!text-[13px] textarea hover-mode' />
          <Button 
          imgSrc={"/images/icons/check.png"}
          onClick={addTask}
          disabled={!isValue()}
          className={`${!isValue()? 'cursor-not-allowed opacity-50' : 'hover-mode active-mode'} h-[40px] m-[2px] ml-auto`} />
        </div>
      </div> 
      }
      <Button 
      imgSrc={"/images/icons/plus.png"}
      imgClassName={`${isClicked && 'rotate-45'}`}
      onClick={handleToggle}
      className='fixed right-10 bottom-10 hover-mode active-mode' />
    </>		
)
  }
