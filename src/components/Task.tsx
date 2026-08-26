import Button from "./Button"
export default function Task(){
  return(
    <div className='task-container active-mode'>
      <input type='checkbox' className='w-[15px] h-[15px]' />
      <p className='ml-[5px] text-[18px] '>Task</p>
      <Button 
      imgSrc={"/images/icons/trash.png"}
      className='!h-[35px] !w-[35px] m-[2px] ml-auto hover-mode active-mode' />
    </div>
  )
}