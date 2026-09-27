export default function MainHeader(){
  return(
    <div className='flex items-center justify-center'>
      <div className='flex'>
        <img data-testid='main-header-image' className='max-sm:!w-[20px] max-lg:!w-[25px] icon ml-[5px]' src='images/icons/task.png'/>
        <p className='ml-[5px] max-sm:text-[10px] max-lg:text-[15px] self-center text-[20px]'>Tasks</p>
      </div>
    </div>
  )
}
