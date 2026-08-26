import saveToStorage from '../utils/save-to-storage'
import dayjs from 'dayjs';
import React from 'react';
import Button from './Button';

export default function AddMode(){
  
  const [isClicked , setIsClick] = React.useState(false)
  const [task,setTask]= React.useState(JSON.parse(localStorage.getItem('task') || '[]'))
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
    const newTask = [...task, {
      task:taskValue,
      descrption : taskDescriptionValue,
      id : crypto.randomUUID(),
      date: dayjs(),
    }]
    setTask(newTask)
    saveToStorage('task',newTask)
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
